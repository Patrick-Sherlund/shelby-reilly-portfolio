import React, {useEffect, useRef, useState} from 'react'
import Polaroid from '../../components/Polaroid/Polaroid'
import {
    AboutTextCard,
    BlueSquiggleImage,
    BottomSection,
    BulletItem,
    BulletList,
    CompanyNamesFour,
    CompanyNamesOne,
    CompanyNamesThree,
    CompanyNamesTwo,
    ContentBlock,
    ContentWrapper,
    HobbiesContentSection,
    HobbiesFooter,
    HobbiesTitle,
    IconTextRow,
    IconWrapper,
    MainContentArea,
    MainWrapper,
    Paragraph,
    ParagraphShort,
    PolaroidSection,
    PresentationImage,
    PresentationSection,
    SectionTitle,
    ShelbyImageContainer,
    ShelbyStandingImage,
    TextContentSection,
    TitleChip,
    TitleSectionContainer,
    TitleSectionInner,
    YellowSquiggle
} from './AboutPage.styles'
import {useSearchContext} from '../../context/SearchContext'
import {useZoomPanContext} from '../../context/ZoomPanContext'
import {DEFAULT_SCROLL_PAGES} from '../../hooks/useZoomPan'


import squigleBlip from '../../assets/images/squigle-blip.svg'
import blueSquiggle from '../../assets/images/blue-squiggle.svg'
import magicWand from '../../assets/images/magic-wand.svg'
import aboutMePresentation from '../../assets/images/about-me-presentation-1.png'
import aboutMeShelbyStanding from '../../assets/images/about-me-shelby-standing-2.png'
import aboutMeShelbyStandingAlt from '../../assets/images/about-me-shelby-standing-3.png'

export default function AboutPage() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [shelbyImageSrc, setShelbyImageSrc] = useState(aboutMeShelbyStandingAlt)
    const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
    const imageRefs = useRef<(HTMLImageElement | HTMLDivElement | null)[]>([])

    const {registerItem, unregisterItem, registerGroupAnchor} = useSearchContext()
    const zoomPanContext = useZoomPanContext()


    const isClient = typeof window !== 'undefined'
    const vw = isClient ? window.innerWidth : 1200
    const vh = isClient ? window.innerHeight : 800
    const isMobile = vw < 900


    useEffect(() => {
        if (sectionRef.current) {
            registerGroupAnchor('About Me', sectionRef.current, 0)
        }

        return () => {
        }
    }, [registerGroupAnchor])

    useEffect(() => {
        if (!isClient) {
            return
        }

        const updateScrollBounds = () => {
            if (!sectionRef.current) {
                return
            }
            const pageHeight = sectionRef.current.getBoundingClientRect().height
            const viewportHeight = window.innerHeight || 1
            const extraPages = Math.max(0, pageHeight / viewportHeight - 1)
            zoomPanContext.setMaxScrollPages(Math.max(extraPages + 0.1, 0))
        }

        updateScrollBounds()
        window.addEventListener('resize', updateScrollBounds)

        return () => {
            window.removeEventListener('resize', updateScrollBounds)
            zoomPanContext.setMaxScrollPages(DEFAULT_SCROLL_PAGES)
        }
    }, [zoomPanContext, isClient])

    useEffect(() => {
        const swapTimer = setTimeout(() => {
            setShelbyImageSrc(aboutMeShelbyStanding)
        }, 2000)

        return () => clearTimeout(swapTimer)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = imageRefs.current.indexOf(entry.target as HTMLImageElement | HTMLDivElement)
                        if (index !== -1) {
                            setVisibleImages((prev) => new Set([...prev, index]))
                        }
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            }
        )

        imageRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref)
            }
        })

        return () => {
            imageRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref)
                }
            })
        }
    }, [])

    return (
        <MainWrapper ref={sectionRef}>
            <ContentWrapper>

                <TitleSectionContainer isMobile={isMobile}>
                    <TitleSectionInner>
                        <TitleChip isMobile={isMobile}>
                            Hi, I'm Shelby!
                        </TitleChip>
                        <TitleChip isMobile={isMobile}>
                            About me 👇
                        </TitleChip>
                    </TitleSectionInner>
                </TitleSectionContainer>

                <MainContentArea isMobile={isMobile}>

                    <PresentationSection isMobile={isMobile}>
                        <YellowSquiggle
                            ref={(el) => (imageRefs.current[0] = el)}
                            src={squigleBlip}
                            alt=""
                            $isVisible={visibleImages.has(0)}
                            $delay={0.1}
                        />
                        <PresentationImage
                            src={aboutMePresentation}
                            alt="Shelby presenting at a conference"
                        />
                    </PresentationSection>

                    <TextContentSection>
                        <AboutTextCard>
                            <SectionTitle isMobile={isMobile}>
                                I'm a Senior Product Designer.
                            </SectionTitle>

                            <ContentBlock>
                                <Paragraph>
                                    I specialize in <strong>simplifying complex systems</strong> and creating{' '}
                                    <strong>experiences users love.</strong>
                                </Paragraph>
                            </ContentBlock>

                            <ContentBlock>
                                <ParagraphShort>
                                    <strong>Previous projects:</strong>{' '}
                                    <CompanyNamesOne>Apple,</CompanyNamesOne>
                                    <CompanyNamesTwo> Google</CompanyNamesTwo>,
                                    <CompanyNamesThree> VMware</CompanyNamesThree>,
                                    <CompanyNamesFour> US Air Force</CompanyNamesFour>.
                                </ParagraphShort>
                            </ContentBlock>

                            <ContentBlock>
                            <Paragraph>
                                I completed my <strong>Masters in Human Computer Interaction</strong>
                                <br style={{display: isMobile ? 'block' : 'none'}}/>
                                <strong> at Georgia Tech</strong> where I worked as a lab Assistant in the{' '}
                                <strong>GVU Prototyping & Usability Labs.</strong>
                            </Paragraph>
                            </ContentBlock>

                            <ContentBlock>
                                <IconTextRow>
                <span>
                  <IconWrapper
                      src={magicWand}
                      alt=""
                      aria-hidden="true"
                  /> Outside of work, I co-run a <strong>nonprofit</strong> focused on modernizing
                  tools for emergency services <strong>using AI/ML/Computer Vision.</strong>
                </span>
                                </IconTextRow>
                            </ContentBlock>
                        </AboutTextCard>

                        <ShelbyImageContainer isMobile={isMobile}>
                            <ShelbyStandingImage
                                ref={(el) => (imageRefs.current[1] = el)}
                                src={shelbyImageSrc}
                                alt="Shelby Reilly"
                                $isVisible={visibleImages.has(1)}
                                $delay={0.2}
                            />
                        </ShelbyImageContainer>
                    </TextContentSection>
                </MainContentArea>

                <BottomSection isMobile={isMobile}>

                    <HobbiesContentSection isMobile={isMobile}>
                        <AboutTextCard>
                            <HobbiesTitle isMobile={isMobile}>
                                When I'm not in Figma (rare, bc figma&lt;3), find me:
                            </HobbiesTitle>

                            <BulletList>
                                <BulletItem>
                                    🌍 <strong>Traveling</strong> Currently at 41 countries and counting
                                </BulletItem>
                                <BulletItem>
                                    🌊 <strong>In the water</strong> Sailing, Scuba, or Swimming
                                </BulletItem>
                                <BulletItem>
                                    🦮 <strong>Exploring Austin</strong> with my dog, Rodeo
                                </BulletItem>
                                <BulletItem>
                                    👩‍💻 Turning life into mini design projects, from <strong>vibe-coding all my crazy
                                    website ideas</strong> to executing next-level <strong>gardening</strong> projects
                                </BulletItem>
                            </BulletList>

                            <HobbiesFooter isMobile={isMobile}>
                                These things keep me curious, grounded, and remind me that{' '}
                                <strong>good design should make life easier.</strong>
                            </HobbiesFooter>
                        </AboutTextCard>

                        <BlueSquiggleImage
                            ref={(el) => (imageRefs.current[2] = el)}
                            src={blueSquiggle}
                            alt=""
                            $isVisible={visibleImages.has(2)}
                            $delay={0.05}
                        />
                    </HobbiesContentSection>

                    <PolaroidSection isMobile={isMobile}>
                        <Polaroid
                            ref={(el) => (imageRefs.current[3] = el)}
                            src={`${process.env.PUBLIC_URL}/images/polaroid/ctrly.png`}
                            alt="Ctrl+Y"
                            title="Ctrl+Y"
                            date="Nov 2024 - Current"
                            width={isMobile ? 150 : 200}
                            rotationDeg={5.75}
                            zIndex={3}
                            top={isMobile ? 0 : 20}
                            left={isMobile ? 0 : 0}
                            $isVisible={visibleImages.has(3)}
                            $delay={0.1}
                        />
                        <Polaroid
                            ref={(el) => (imageRefs.current[4] = el)}
                            src={`${process.env.PUBLIC_URL}/images/polaroid/dpod.png`}
                            alt="dPod"
                            title="dPod"
                            date="Aug 2019 - Dec 2019"
                            width={isMobile ? 150 : 184}
                            rotationDeg={-10}
                            zIndex={2}
                            top={isMobile ? 10 : 40}
                            left={isMobile ? 120 : 200}
                            $isVisible={visibleImages.has(4)}
                            $delay={0.15}
                        />
                        <Polaroid
                            ref={(el) => (imageRefs.current[5] = el)}
                            src={`${process.env.PUBLIC_URL}/images/polaroid/hoop.png`}
                            alt="LED Basketball Hoop"
                            title="LED Basketball Hoop"
                            date="Sept [wk] 2022"
                            width={isMobile ? 150 : 150}
                            rotationDeg={3}
                            zIndex={4}
                            top={isMobile ? 20 : 10}
                            left={isMobile ? 240 : 380}
                            $isVisible={visibleImages.has(5)}
                            $delay={0.2}
                        />
                    </PolaroidSection>
                </BottomSection>
            </ContentWrapper>
        </MainWrapper>
    )
}
