import React from 'react'
import {ReactComponent as GemSVGLight} from '../../../assets/images/gem_light.svg'
import {ReactComponent as GemSVGDark} from '../../../assets/images/gem_dark.svg'
import {useThemeMode} from '../../../theme/ThemeProvider'
import SVGDraw from '../SVGDraw'

type Props = {
    width?: number | string
    height?: number | string
    stroke?: string
    strokeWidth?: number
    duration?: number
    stagger?: number
    trigger?: 'mount' | 'inView'
    replayKey?: number
    fillAfter?: string | null
    customDurations?: number[]
}

const GemDraw: React.FC<Props> = ({
                                      width = 120,
                                      height = 120,
                                      stroke = '#5263FF',
                                      strokeWidth = 2,
                                      duration = 0.9,
                                      stagger = 0.12,
                                      trigger = 'mount',
                                      replayKey = 0,
                                      fillAfter = null,
                                      customDurations
                                  }) => {
    const {mode} = useThemeMode()
    const GemSVG = mode === 'dark' ? GemSVGLight : GemSVGDark

    return (
        <SVGDraw
            width={width}
            height={height}
            stroke={stroke}
            strokeWidth={strokeWidth}
            duration={duration}
            stagger={stagger}
            trigger={trigger}
            replayKey={replayKey}
            fillAfter={fillAfter}
            customDurations={customDurations}
        >
            <GemSVG/>
        </SVGDraw>
    )
}

export default React.memo(GemDraw)
