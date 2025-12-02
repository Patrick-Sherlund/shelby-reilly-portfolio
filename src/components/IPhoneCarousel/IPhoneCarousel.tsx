import React, {useEffect, useRef, useState} from 'react'
import {CarouselContainer, CarouselTrack, IPhoneImage, IPhoneWrapper} from './IPhoneCarousel.styles'

interface IPhoneCarouselProps {
    images: string[]
    height?: number | string
}

export default function IPhoneCarousel({images, height = 600}: IPhoneCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)


    const extendedImages = [...images, ...images, ...images]


    const CENTER_HEIGHT = 640
    const SIDE_HEIGHT = 531
    const OUTER_HEIGHT = 452


    const ASPECT_RATIO = 594 / 1287


    const CENTER_WIDTH = CENTER_HEIGHT * ASPECT_RATIO
    const SIDE_WIDTH = SIDE_HEIGHT * ASPECT_RATIO
    const OUTER_WIDTH = OUTER_HEIGHT * ASPECT_RATIO


    const spacingUnit = 180
    const itemWidth = spacingUnit

    useEffect(() => {


        const container = containerRef.current
        if (!container) return

        const containerWidth = container.offsetWidth
        const centerX = containerWidth / 2


        const middleImageIndex = images.length
        const initialPosition = middleImageIndex * itemWidth - centerX + itemWidth / 2

        setScrollPosition(initialPosition + 10)
    }, [images.length, itemWidth])


    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleWheel = (e: WheelEvent) => {

            if (Math.abs(e.deltaX) > 0) {
                e.preventDefault()

                setScrollPosition(prev => {
                    const newPos = prev + e.deltaX


                    const singleSetWidth = images.length * itemWidth
                    const minPos = 0
                    const maxPos = singleSetWidth * 2


                    if (newPos >= maxPos) {
                        return newPos - singleSetWidth
                    }

                    if (newPos <= minPos) {
                        return newPos + singleSetWidth
                    }

                    return newPos
                })
            }
        }

        container.addEventListener('wheel', handleWheel, {passive: false})
        return () => container.removeEventListener('wheel', handleWheel)
    }, [images.length])


    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
        setScrollLeft(scrollPosition)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (containerRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2

        setScrollPosition(prev => {
            const newPos = scrollLeft - walk


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

    // Touch event handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0))
        setScrollLeft(scrollPosition)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2

        setScrollPosition(prev => {
            const newPos = scrollLeft - walk

            // Handle infinite scroll wrapping
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

    const handleTouchEnd = () => {
        setIsDragging(false)
    }


    const getHeight = (index: number) => {
        if (!containerRef.current) return CENTER_HEIGHT

        const containerWidth = containerRef.current.offsetWidth
        const centerX = containerWidth / 2


        const itemPosition = index * itemWidth - scrollPosition + itemWidth / 2


        const distanceFromCenter = itemPosition - centerX


        const slotPosition = distanceFromCenter / itemWidth
        const absSlot = Math.abs(slotPosition)


        if (absSlot <= 2.0) {


            if (absSlot <= 1.0) {

                const t = absSlot
                return CENTER_HEIGHT + (SIDE_HEIGHT - CENTER_HEIGHT) * t
            } else {

                const t = absSlot - 1.0
                return SIDE_HEIGHT + (OUTER_HEIGHT - SIDE_HEIGHT) * t
            }
        } else {

            return OUTER_HEIGHT
        }
    }


    const getZIndex = (index: number) => {
        if (!containerRef.current) return 1

        const containerWidth = containerRef.current.offsetWidth
        const centerX = containerWidth / 2

        const itemPosition = index * itemWidth - scrollPosition + itemWidth / 2
        const distanceFromCenter = itemPosition - centerX
        const slotPosition = distanceFromCenter / itemWidth
        const absSlot = Math.abs(slotPosition)


        return Math.round(100 - absSlot * 10)
    }

    return (
        <CarouselContainer
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            $height={height}
            $isDragging={isDragging}
        >
            <CarouselTrack ref={trackRef}>
                {extendedImages.map((imgSrc, index) => {
                    const containerWidth = containerRef.current?.offsetWidth || 1400
                    const centerX = containerWidth / 2


                    const centerIndex = Math.round((scrollPosition + centerX - itemWidth / 2) / itemWidth)


                    const distanceFromCenter = Math.abs(index - centerIndex)
                    if (distanceFromCenter > 2) {
                        return null
                    }

                    const height = getHeight(index)
                    const zIndex = getZIndex(index)
                    const actualWidth = height * ASPECT_RATIO


                    const xPosition = index * itemWidth - scrollPosition


                    const renderPositions: number[] = []


                    renderPositions.push(xPosition)


                    const leftEdge = xPosition
                    const rightEdge = xPosition + actualWidth

                    if (leftEdge < 0 && rightEdge > 0) {


                        const singleSetWidth = images.length * itemWidth
                        renderPositions.push(xPosition + singleSetWidth)
                    }


                    if (leftEdge < containerWidth && rightEdge > containerWidth) {


                        const singleSetWidth = images.length * itemWidth
                        renderPositions.push(xPosition - singleSetWidth)
                    }

                    return renderPositions.map((position, posIdx) => (
                        <IPhoneWrapper
                            key={`iphone-${index}-${posIdx}`}
                            $height={height}
                            $zIndex={zIndex}
                            style={{
                                transform: `translate(${position}px, -50%)`
                            }}
                        >
                            <IPhoneImage
                                src={imgSrc}
                                alt={`iPhone screen ${(index % images.length) + 1}`}
                                draggable={false}
                            />
                        </IPhoneWrapper>
                    ))
                })}
            </CarouselTrack>
        </CarouselContainer>
    )
}
