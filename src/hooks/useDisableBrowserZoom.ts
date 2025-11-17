import {useEffect} from 'react'

export function useDisableBrowserZoom() {
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {


            if (e.ctrlKey || e.metaKey) {
                e.preventDefault()
            }
        }

        const keydownHandler = (e: KeyboardEvent) => {

            if (e.ctrlKey || e.metaKey) {
                const zoomKeys = ['=', '+', '-', '0']
                if (zoomKeys.includes(e.key)) {
                    e.preventDefault()
                }
            }
        }


        window.addEventListener('wheel', wheelHandler, {passive: false})
        window.addEventListener('keydown', keydownHandler)

        return () => {
            window.removeEventListener('wheel', wheelHandler)
            window.removeEventListener('keydown', keydownHandler)
        }
    }, [])
} 