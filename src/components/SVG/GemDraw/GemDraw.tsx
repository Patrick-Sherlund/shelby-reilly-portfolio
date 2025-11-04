// src/components/SVG/GemDraw/GemDraw.tsx
import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as GemSVGLight } from '../../../assets/images/gem_light.svg'
import { ReactComponent as GemSVGDark } from '../../../assets/images/gem_dark.svg'
import { useThemeMode } from '../../../theme/ThemeProvider'

type Props = {
  width?: number | string
  height?: number | string
  stroke?: string
  strokeWidth?: number
  duration?: number          // seconds per path
  stagger?: number           // seconds between paths
  trigger?: 'mount' | 'inView'
  replayKey?: number         // change value to replay
  fillAfter?: string | null  // e.g. '#6675FF' to fill after draw; null = no fill
  customDurations?: number[] // optional array of custom durations per path index
}

const GemDraw: React.FC<Props> = ({
  width = 120,
  height = 120,
  stroke = '#6675FF',
  strokeWidth = 2,
  duration = 0.9,
  stagger = 0.12,
  trigger = 'mount',
  replayKey = 0,
  fillAfter = null,
  customDurations
}) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(trigger === 'mount')
  const { mode } = useThemeMode()
  const GemSVG = mode === 'dark' ? GemSVGLight : GemSVGDark

  // Trigger when scrolled into view (optional)
  useEffect(() => {
    if (trigger !== 'inView') return
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true)
        io.disconnect()
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [trigger])

  useEffect(() => {
    if (!ready || !hostRef.current) return
    const svg = hostRef.current.querySelector('svg')
    if (!svg) return

    const nodes = svg.querySelectorAll<SVGGeometryElement>(
      'path, line, polyline, polygon, circle, rect'
    )

    // Prepare each path
    const originalFills: Array<[SVGElement, string | null]> = []
    nodes.forEach((node) => {
      const el = node as unknown as SVGElement & SVGGeometryElement
      originalFills.push([el, el.getAttribute('fill')])
      el.setAttribute('fill', 'none')
      el.setAttribute('stroke', stroke)
      el.setAttribute('stroke-width', String(strokeWidth))
      el.setAttribute('stroke-linecap', el.getAttribute('stroke-linecap') || 'round')
      el.setAttribute('stroke-linejoin', el.getAttribute('stroke-linejoin') || 'round')

      let length = 0
      try {
        // @ts-ignore
        length = typeof el.getTotalLength === 'function' ? el.getTotalLength() : 0
      } catch {}
      if (!isFinite(length) || length <= 0) length = 400

      el.style.strokeDasharray = String(length)
      el.style.strokeDashoffset = String(length)
    })

    // Animate using the Web Animations API (no CSS keyframes needed)
    nodes.forEach((node, i) => {
      const el = node as SVGElement
      const pathDuration = customDurations?.[i] ?? duration
      el.animate(
        [{ strokeDashoffset: el.style.strokeDashoffset }, { strokeDashoffset: '0' }],
        {
          duration: pathDuration * 1000,
          easing: 'ease',
          fill: 'forwards',
          delay: i * stagger * 1000
        }
      )
    })

    // Optional: restore/add fill at the end
    const totalMs = (duration * nodes.length + stagger * (nodes.length - 1)) * 1000
    const timer = window.setTimeout(() => {
      if (fillAfter) {
        nodes.forEach((n) => (n as SVGElement).setAttribute('fill', fillAfter))
      }
    }, Math.max(0, totalMs - 20))

    return () => {
      window.clearTimeout(timer)
      if (!fillAfter) {
        originalFills.forEach(([el, orig]) => {
          if (orig == null) el.removeAttribute('fill')
          else el.setAttribute('fill', orig)
        })
      }
    }
  }, [ready, stroke, strokeWidth, duration, stagger, fillAfter, replayKey, customDurations])

  return (
    <div ref={hostRef} style={{ display: 'inline-block', lineHeight: 0, width, height }}>
      <GemSVG width={width} height={height} />
    </div>
  )
}

export default React.memo(GemDraw)
