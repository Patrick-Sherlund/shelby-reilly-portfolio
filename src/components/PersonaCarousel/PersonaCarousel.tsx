import React, {useState} from 'react'
import {CarouselBackground, CarouselContainer, CarouselTrack, PersonaCard} from './PersonaCarousel.styles'

interface PersonaCarouselProps {
    personas: string[]
    backgroundImage: string
}

export default function PersonaCarousel({personas, backgroundImage}: PersonaCarouselProps) {
    const [isHovering, setIsHovering] = useState(false)


    const extendedPersonas = [...personas, ...personas, ...personas, ...personas]

    return (
        <CarouselContainer>
            <CarouselBackground src={backgroundImage} alt=""/>
            <CarouselTrack $isPaused={isHovering}>
                {extendedPersonas.map((persona, index) => {

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
