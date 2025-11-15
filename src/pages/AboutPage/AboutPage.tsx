import React, { useRef, useEffect, useState } from 'react'
import Polaroid from '../../components/Polaroid/Polaroid'
import {
  MainWrapper,
  ContentWrapper,
  TitleSectionContainer,
  TitleSectionInner,
  TitleChip,
  MainContentArea,
  PresentationSection,
  TextContentSection,
  AboutTextCard,
  SectionTitle,
  Paragraph,
  ParagraphShort,
  CompanyNamesOne,
  CompanyNamesTwo,
  CompanyNamesThree,
  CompanyNamesFour,
  IconTextRow,
  ShelbyImageContainer,
  BottomSection,
  HobbiesContentSection,
  HobbiesTitle,
  HobbiesFooter,
  BlueSquiggleImage,
  PolaroidSection,
  PresentationImage,
  ShelbyStandingImage,
  YellowSquiggle,
  BulletList,
  BulletItem,
  IconWrapper
} from './AboutPage.styles'
import { useSearchContext } from '../../context/SearchContext'

// Import images from assets
import squigleBlip from '../../assets/images/squigle-blip.svg'
import blueSquiggle from '../../assets/images/blue-squiggle.svg'
import magicWand from '../../assets/images/magic-wand.svg'
import aboutMePresentation from '../../assets/images/about-me-presentation-1.png'
import aboutMeShelbyStanding from '../../assets/images/about-me-shelby-standing-2.png'

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { registerItem, unregisterItem, registerGroupAnchor } = useSearchContext()

  // --- responsive runtime flags ---
  const isClient = typeof window !== 'undefined'
  const vw = isClient ? window.innerWidth : 1200
  const vh = isClient ? window.innerHeight : 800
  const isMobile = vw < 900

  /* --- Register search items --- */
  useEffect(() => {
    if (sectionRef.current) {
      registerGroupAnchor('About Me', sectionRef.current, 0)
    }

    return () => {}
  }, [registerGroupAnchor])

  return (
    <MainWrapper ref={sectionRef}>
      <ContentWrapper>
        {/* Title Section - positioned at top left */}
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

        {/* Main Content Area */}
        <MainContentArea isMobile={isMobile}>
          {/* Left Section - Presentation Image */}
          <PresentationSection isMobile={isMobile}>
            <YellowSquiggle
              src={squigleBlip}
              alt=""
            />
            <PresentationImage
              src={aboutMePresentation}
              alt="Shelby presenting at a conference"
            />
          </PresentationSection>

          {/* Right Section - Text Content with overlapping Shelby Image */}
          <TextContentSection>
            <AboutTextCard>
              <SectionTitle isMobile={isMobile}>
                I'm a Senior Product Designer.
              </SectionTitle>

              <Paragraph>
                I specialize in <strong>simplifying complex systems</strong> and creating{' '}
                <strong>experiences users love.</strong>
              </Paragraph>

              <ParagraphShort>
                <strong>Previous projects:</strong>{' '}
                <CompanyNamesOne>Apple,</CompanyNamesOne>
                <CompanyNamesTwo> Google</CompanyNamesTwo>,
                <CompanyNamesThree> VMware</CompanyNamesThree>,
                <CompanyNamesFour> US Air Force</CompanyNamesFour>.
              </ParagraphShort>

              <Paragraph>
                I completed my <strong>Masters in Human Computer Interaction at Georgia Tech</strong>{' '}
                where I worked as a lab Assistant in the{' '}
                <strong>GVU Prototyping & Usability Labs.</strong>
              </Paragraph>

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
            </AboutTextCard>

            {/* Shelby Standing Image - overlapping on the right */}
            <ShelbyImageContainer isMobile={isMobile}>
              <ShelbyStandingImage
                src={aboutMeShelbyStanding}
                alt="Shelby Reilly"
              />
            </ShelbyImageContainer>
          </TextContentSection>
        </MainContentArea>

        {/* Bottom Section - Hobbies + Polaroids */}
        <BottomSection isMobile={isMobile}>
          {/* Left - Hobbies Content with Blue Squiggle */}
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
                  👩‍💻 Turning life into mini design projects, from <strong>vibe-coding all my crazy website ideas</strong> to executing next-level <strong>gardening</strong> projects
                </BulletItem>
              </BulletList>

              <HobbiesFooter isMobile={isMobile}>
                These things keep me curious, grounded, and remind me that{' '}
                <strong>good design should make life easier.</strong>
              </HobbiesFooter>
            </AboutTextCard>

            {/* Blue Squiggle at bottom right of content */}
            <BlueSquiggleImage
              src={blueSquiggle}
              alt=""
            />
          </HobbiesContentSection>

          {/* Right - Polaroid Photos */}
          <PolaroidSection isMobile={isMobile}>
            <Polaroid
              src={`${process.env.PUBLIC_URL}/images/polaroid/ctrly.png`}
              alt="Ctrl+Y"
              title="Ctrl+Y"
              date="Nov 2024 - Current"
              width={isMobile ? 140 : 150}
              rotationDeg={-4}
              zIndex={3}
              top={isMobile ? 0 : 20}
              left={isMobile ? 0 : 0}
            />
            <Polaroid
              src={`${process.env.PUBLIC_URL}/images/polaroid/dpod.png`}
              alt="dPod"
              title="dPod"
              date="Aug 2019 - Dec 2019"
              width={isMobile ? 140 : 150}
              rotationDeg={2}
              zIndex={2}
              top={isMobile ? 20 : 40}
              left={isMobile ? 20 : 150}
            />
            <Polaroid
              src={`${process.env.PUBLIC_URL}/images/polaroid/hoop.png`}
              alt="LED Basketball Hoop"
              title="LED Basketball Hoop"
              date="Sept [wk] 2022"
              width={isMobile ? 140 : 150}
              rotationDeg={-3}
              zIndex={4}
              top={isMobile ? 40 : 10}
              left={isMobile ? 40 : 300}
            />
          </PolaroidSection>
        </BottomSection>
      </ContentWrapper>
    </MainWrapper>
  )
}
