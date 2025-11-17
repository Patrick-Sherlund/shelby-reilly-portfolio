import React, {createContext, useContext} from 'react'
import Konva from 'konva'

export interface ZoomPanContextValue {
    stageRef: React.RefObject<Konva.Stage>
    stageScale: number
    setStageScale: React.Dispatch<React.SetStateAction<number>>
    stagePos: { x: number; y: number }
    setStagePos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
    maxScrollPages: number
    setMaxScrollPages: React.Dispatch<React.SetStateAction<number>>
    clampStagePosition: (y: number) => number
    zoomIn: (stageRef: React.RefObject<Konva.Stage>) => void
    zoomOut: (stageRef: React.RefObject<Konva.Stage>) => void
    activeTool?: string
}


export const ZoomPanContext = createContext<ZoomPanContextValue | undefined>(
    undefined
)

export function useZoomPanContext(): ZoomPanContextValue {
    const ctx = useContext(ZoomPanContext)
    if (!ctx) {
        throw new Error('useZoomPanContext must be used within a ZoomPanContext provider')
    }
    return ctx
} 
