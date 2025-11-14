// PersonaCarousel.tsx
import React, { useState } from 'react'
import {
    CarouselContainer,
    CarouselBackground,
    CarouselTrack,
    PersonaCard
} from './PersonaCarousel.styles'

interface PersonaCarouselProps {
    personas: string[]
    backgroundImage: string
}

export default function PersonaCarousel({ personas, backgroundImage }: PersonaCarouselProps) {
    const [isHovering, setIsHovering] = useState(false)

    // Triple the array for seamless infinite scrolling
    const extendedPersonas = [...personas, ...personas, ...personas, ...personas]

    return (
        <CarouselContainer>
            <CarouselBackground src={backgroundImage} alt="" />
            <CarouselTrack $isPaused={isHovering}>
                {extendedPersonas.map((persona, index) => {
                    // Alternate between top and bottom offset
                    const isEven = index % 2 === 0
                    return (
                        <PersonaCard
                            key={`persona-${index}`}
                            src={persona}
                            alt={`Persona ${(index % personas.length) + 1}`}
                            $offsetTop={isEven}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        />
                    )
                })}
            </CarouselTrack>
        </CarouselContainer>
    )
}
