// BishopProjectPage.tsx
import React from 'react'
import Box from '@mui/material/Box'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav"
import { GlobalStyles, Typography } from '@mui/material'
import {
    ProjectPageContainer,
    BoardContent,
    ContentWrapper,
    BackButton,
    HeroSection,
    HeroLogo,
    HeroBannerWrapper,
    HeroBannerRight,
    HeroBanner,
    HeroContent,
    HeroDevices,
    SectionDivider,
    ChallengeSection,
    ChallengeTitle,
    ChallengeSubtitle,
    ChallengeGrid,
    ChallengeCard,
    ChallengeCardTitle,
    ChallengeCardContent,
    HurricaneImage,
} from './BishopProjectPage.styles'

import bishopLogo from '../../assets/images/bishop-logo.png'
import bishopHeroBanner from '../../assets/images/bishop-hero-banner.png'
import bishopDevices from '../../assets/images/bishop_devices.png'
import bishopHurricaneImage from '../../assets/images/bishop_hurricane_image.png'

export default function BishopProjectPage() {
    const handleBackClick = () => { window.location.hash = '' }

    return (
        <ProjectPageContainer>
            {/* Root scroll stays on body/viewport; no nested scroll containers */}
            <GlobalStyles styles={{
                'html, body, #root': {
                    height: 'auto',
                    minHeight: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }
            }} />

            <BoardContent>
                <ContentWrapper>
                    {/* HERO */}
                    <HeroSection>
                        <HeroBannerWrapper>
                            <HeroBanner src={bishopHeroBanner} alt="hero banner" />
                            <HeroBannerRight />
                        </HeroBannerWrapper>

                        <HeroContent>
                            <HeroLogo src={bishopLogo} alt="Bishop logo" />

                            <Box sx={{ marginTop: '3rem' }}>
                                <Typography sx={{fontSize: '1.25rem', textAlign: "center" }}>
                                    AI-powered drone search & rescue platform
                                </Typography>

                                <Typography sx={{fontSize: '1.25rem', textAlign: "center" }}>
                                    designed for speed, safety, and hope.
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 3, sm: 6, md: 12 },
                                marginTop: 12,
                                marginBottom: 4,
                                marginX: "auto",
                                padding: "32px",
                                borderRadius: 4,
                                width: "max-content",
                                backgroundColor: "#0E1224",
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Role</Typography>
                                    <Typography fontWeight={'600'}>UX Designer</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Team</Typography>
                                    <Typography fontWeight={'600'}>1 Eng, 1 Design</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Timeline</Typography>
                                    <Typography fontWeight={'600'}>6 months</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Tools/Skills</Typography>
                                    <Typography fontWeight={'600'}>AI, ML, UX, Video</Typography>
                                </Box>
                            </Box>

                            <SectionDivider />
                        </HeroContent>

                        <Box sx={{ marginY: 6, width: '80%', display: 'flex', justifyContent: 'center' }}>
                            <HeroDevices src={bishopDevices} alt="Bishop devices" />
                        </Box>
                    </HeroSection>

                    <SectionDivider />

                    {/* THE CHALLENGE */}
                    <ChallengeSection>
                        <ChallengeTitle>The Challenge</ChallengeTitle>
                        <ChallengeSubtitle>
                            locating people efficiently during<br />
                            search and rescue missions
                        </ChallengeSubtitle>

                        <ChallengeGrid>
                            <ChallengeCard>
                                <ChallengeCardTitle>Current Process</ChallengeCardTitle>
                                <ChallengeCardContent>
                                    Manual: limited processing capability to 1 person viewing drone footage
                                </ChallengeCardContent>
                            </ChallengeCard>

                            <ChallengeCard>
                                <ChallengeCardTitle>Natural Disasters</ChallengeCardTitle>
                                <ChallengeCardContent>
                                    Created in response to 2024 Southeast Coastal Hurricane tragedies
                                </ChallengeCardContent>
                            </ChallengeCard>

                            <ChallengeCard>
                                <ChallengeCardTitle>Urgency</ChallengeCardTitle>
                                <ChallengeCardContent>
                                    National Association for Search and Rescue reports the chance of finding someone alive plummets after 72 hrs
                                </ChallengeCardContent>
                            </ChallengeCard>
                        </ChallengeGrid>
                    </ChallengeSection>

                </ContentWrapper>
            </BoardContent>

            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav />
        </ProjectPageContainer>
    )
}
