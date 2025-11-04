// IPhoneCarousel.tsx
import React, { useRef, useState, useEffect } from 'react'
import {
    CarouselContainer,
    CarouselTrack,
    IPhoneWrapper,
    IPhoneImage
} from './IPhoneCarousel.styles'

interface IPhoneCarouselProps {
    images: string[]
    height?: number | string
}

export default function IPhoneCarousel({ images, height = 600 }: IPhoneCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    // Create an extended array for infinite scroll effect
    // We'll render: [...images, ...images, ...images] to allow seamless looping
    const extendedImages = [...images, ...images, ...images]

    // Exact heights for each position
    const CENTER_HEIGHT = 640 // Center iPhone height
    const SIDE_HEIGHT = 531 // ±1 position height
    const OUTER_HEIGHT = 452 // ±2 position height

    // Image aspect ratio: 594 / 1287 ≈ 0.4616
    const ASPECT_RATIO = 594 / 1287

    // Calculate widths at each height
    const CENTER_WIDTH = CENTER_HEIGHT * ASPECT_RATIO // ≈ 295px
    const SIDE_WIDTH = SIDE_HEIGHT * ASPECT_RATIO // ≈ 245px
    const OUTER_WIDTH = OUTER_HEIGHT * ASPECT_RATIO // ≈ 209px

    // Use a fixed spacing unit for completely consistent positioning
    // This is the distance between each iPhone's center point
    // Tight spacing to eliminate gaps while maintaining overlap
    const spacingUnit = 180 // Fixed spacing between centers (tighter to prevent gaps)
    const itemWidth = spacingUnit // Use spacing unit as item width for calculations

    useEffect(() => {
        // Start at the middle set of images, centered
        // We want iPhone at index images.length (middle of the 3 sets) to be at viewport center
        const container = containerRef.current
        if (!container) return

        const containerWidth = container.offsetWidth
        const centerX = containerWidth / 2

        // Position the middle iPhone (index = images.length) at the center
        // The iPhone's left edge is at: index * itemWidth - scrollPosition
        // We want that position to be: centerX - (itemWidth / 2) so the iPhone is centered
        const middleImageIndex = images.length
        const initialPosition = middleImageIndex * itemWidth - centerX + itemWidth / 2

        setScrollPosition(initialPosition)
    }, [images.length, itemWidth])

    // Handle wheel scroll for HORIZONTAL scrolling ONLY
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleWheel = (e: WheelEvent) => {
            // Only handle horizontal scroll (deltaX), ignore vertical scroll (deltaY)
            if (Math.abs(e.deltaX) > 0) {
                e.preventDefault()

                setScrollPosition(prev => {
                    const newPos = prev + e.deltaX

                    // Infinite scroll logic
                    const singleSetWidth = images.length * itemWidth
                    const minPos = 0
                    const maxPos = singleSetWidth * 2

                    // If we've scrolled past the end of the middle set, jump back
                    if (newPos >= maxPos) {
                        return newPos - singleSetWidth
                    }
                    // If we've scrolled before the start of the middle set, jump forward
                    if (newPos <= minPos) {
                        return newPos + singleSetWidth
                    }

                    return newPos
                })
            }
        }

        container.addEventListener('wheel', handleWheel, { passive: false })
        return () => container.removeEventListener('wheel', handleWheel)
    }, [images.length])

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
        setScrollLeft(scrollPosition)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (containerRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2 // Multiply for faster scroll

        setScrollPosition(prev => {
            const newPos = scrollLeft - walk

            // Infinite scroll logic
            const singleSetWidth = images.length * itemWidth
            const minPos = 0
            const maxPos = singleSetWidth * 2

            if (newPos >= maxPos) {
                setScrollLeft(scrollLeft - singleSetWidth)
                return newPos - singleSetWidth
            }
            if (newPos <= minPos) {
                setScrollLeft(scrollLeft + singleSetWidth)
                return newPos + singleSetWidth
            }

            return newPos
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    // Calculate height with smooth linear interpolation between positions
    const getHeight = (index: number) => {
        if (!containerRef.current) return CENTER_HEIGHT

        const containerWidth = containerRef.current.offsetWidth
        const centerX = containerWidth / 2

        // Calculate the position of this iPhone's center
        const itemPosition = index * itemWidth - scrollPosition + itemWidth / 2

        // Distance from center of viewport (in pixels)
        const distanceFromCenter = itemPosition - centerX

        // Calculate exact position in "slots" (0 = center, ±1 = first side, ±2 = outer)
        const slotPosition = distanceFromCenter / itemWidth
        const absSlot = Math.abs(slotPosition)

        // Smooth linear interpolation between heights using continuous function
        // This ensures no jumps at slot boundaries
        if (absSlot <= 2.0) {
            // Create a completely smooth interpolation from 0 to 2
            // At 0: CENTER_HEIGHT (640)
            // At 1: SIDE_HEIGHT (531)
            // At 2: OUTER_HEIGHT (452)

            if (absSlot <= 1.0) {
                // Between center (0) and first side (1)
                const t = absSlot
                return CENTER_HEIGHT + (SIDE_HEIGHT - CENTER_HEIGHT) * t
            } else {
                // Between first side (1) and outer (2)
                const t = absSlot - 1.0
                return SIDE_HEIGHT + (OUTER_HEIGHT - SIDE_HEIGHT) * t
            }
        } else {
            // Beyond ±2, keep at outer size
            return OUTER_HEIGHT
        }
    }

    // Calculate z-index based on distance from center
    const getZIndex = (index: number) => {
        if (!containerRef.current) return 1

        const containerWidth = containerRef.current.offsetWidth
        const centerX = containerWidth / 2

        const itemPosition = index * itemWidth - scrollPosition + itemWidth / 2
        const distanceFromCenter = itemPosition - centerX
        const slotPosition = distanceFromCenter / itemWidth
        const absSlot = Math.abs(slotPosition)

        // Center has highest z-index, decreases as we move away
        // Use continuous z-index based on distance for smooth transitions
        return Math.round(100 - absSlot * 10)
    }

    return (
        <CarouselContainer
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            $height={height}
            $isDragging={isDragging}
        >
            <CarouselTrack ref={trackRef}>
                {extendedImages.map((imgSrc, index) => {
                    // Calculate which iPhone is at the center based on scroll position
                    const containerWidth = containerRef.current?.offsetWidth || 1400
                    const centerX = containerWidth / 2

                    // Find the center iPhone index (the one closest to center of viewport)
                    const centerIndex = Math.round((scrollPosition + centerX - itemWidth / 2) / itemWidth)

                    // Only render 5 iPhones: center, ±1, ±2
                    const distanceFromCenter = Math.abs(index - centerIndex)
                    if (distanceFromCenter > 2) {
                        return null
                    }

                    const height = getHeight(index)
                    const zIndex = getZIndex(index)

                    // Calculate position for this iPhone
                    const xPosition = index * itemWidth - scrollPosition

                    return (
                        <IPhoneWrapper
                            key={`iphone-${index}`}
                            $height={height}
                            $zIndex={zIndex}
                            style={{
                                transform: `translate(${xPosition}px, -50%)`
                            }}
                        >
                            <IPhoneImage
                                src={imgSrc}
                                alt={`iPhone screen ${(index % images.length) + 1}`}
                                draggable={false}
                            />
                        </IPhoneWrapper>
                    )
                })}
            </CarouselTrack>
        </CarouselContainer>
    )
}
