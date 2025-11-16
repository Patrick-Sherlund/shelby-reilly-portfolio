// src/components/SVG/SVGDraw/SVGDraw.tsx
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactElement // The SVG element to animate
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
  threshold?: number         // intersection observer threshold (default 0.3)
  preserveStroke?: boolean   // preserve original stroke from SVG (default false)
  preserveColors?: boolean   // preserve original fill colors from SVG (default false)
}

const SVGDraw: React.FC<Props> = ({
  children,
  width = 120,
  height = 120,
  stroke = '#5263FF',
  strokeWidth = 2,
  duration = 0.9,
  stagger = 0.12,
  trigger = 'mount',
  replayKey = 0,
  fillAfter = null,
  customDurations,
  threshold = 0.3,
  preserveStroke = false,
  preserveColors = false
}) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(trigger === 'mount')

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
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [trigger, threshold])

  useEffect(() => {
    if (!ready || !hostRef.current) return
    const svg = hostRef.current.querySelector('svg')
    if (!svg) return

    const nodes = svg.querySelectorAll<SVGGeometryElement>(
      'path, line, polyline, polygon, circle, rect'
    )

    // Prepare each path
    const originalFills: Array<[SVGElement, string | null]> = []
    const originalStrokes: Array<[SVGElement, string | null, string | null]> = []

    nodes.forEach((node) => {
      const el = node as unknown as SVGElement & SVGGeometryElement

      // Store original fill
      originalFills.push([el, el.getAttribute('fill')])

      // Store original stroke attributes
      const origStroke = el.getAttribute('stroke')
      const origStrokeWidth = el.getAttribute('stroke-width')
      originalStrokes.push([el, origStroke, origStrokeWidth])

      // Always set fill to none during drawing animation
      // We'll restore it later if preserveColors is true
      el.setAttribute('fill', 'none')

      // Set stroke (preserve if requested)
      if (!preserveStroke) {
        el.setAttribute('stroke', stroke)
        el.setAttribute('stroke-width', String(strokeWidth))
      } else if (!origStroke) {
        // If preserving but no stroke exists, use default
        el.setAttribute('stroke', stroke)
        el.setAttribute('stroke-width', String(strokeWidth))
      }

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
    const timers: number[] = []
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

      // Fill this specific path when its stroke animation completes
      const pathCompleteTime = i * stagger * 1000 + pathDuration * 1000
      const timer = window.setTimeout(() => {
        if (fillAfter) {
          el.setAttribute('fill', fillAfter)
        } else if (preserveColors) {
          // Restore original fill for this specific path
          const [, origFill] = originalFills[i]
          if (origFill == null) el.removeAttribute('fill')
          else el.setAttribute('fill', origFill)
        }
      }, Math.max(0, pathCompleteTime - 20))

      timers.push(timer)
    })

    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      if (!fillAfter && !preserveColors) {
        originalFills.forEach(([el, orig]) => {
          if (orig == null) el.removeAttribute('fill')
          else el.setAttribute('fill', orig)
        })
      }
    }
  }, [ready, stroke, strokeWidth, duration, stagger, fillAfter, replayKey, customDurations, preserveStroke, preserveColors])

  return (
    <div ref={hostRef} style={{ display: 'inline-block', lineHeight: 0, width, height }}>
      {React.cloneElement(children, { width, height })}
    </div>
  )
}

export default React.memo(SVGDraw)
