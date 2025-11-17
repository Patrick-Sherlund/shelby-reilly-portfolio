import React, {createContext, ReactNode, useContext, useState} from 'react'
import {Waypoint} from '../components/CursorSimulator/CursorSimulator'

type CursorSimulatorContextType = {
    waypoints: Waypoint[]
    setWaypoints: (waypoints: Waypoint[]) => void
    startCursor: boolean
    setStartCursor: (start: boolean) => void
}

const CursorSimulatorContext = createContext<CursorSimulatorContextType | undefined>(undefined)

export function CursorSimulatorProvider({children}: { children: ReactNode }) {
    const [waypoints, setWaypoints] = useState<Waypoint[]>([])
    const [startCursor, setStartCursor] = useState(false)

    return (
        <CursorSimulatorContext.Provider
            value={{
                waypoints,
                setWaypoints,
                startCursor,
                setStartCursor
            }}
        >
            {children}
        </CursorSimulatorContext.Provider>
    )
}

export function useCursorSimulator() {
    const context = useContext(CursorSimulatorContext)
    if (!context) {
        throw new Error('useCursorSimulator must be used within CursorSimulatorProvider')
    }
    return context
}
