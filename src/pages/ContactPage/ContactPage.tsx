import React from 'react'
import {ReactComponent as LinkedInIconDark} from '../../assets/linkedin-dark.svg'
import {
    ContactStack,
    Content,
    Headline,
    MainWrapper,
    SocialLink,
    Subheading,
    TopDash
} from './ContactPage.styles'

export default function ContactPage() {
    return (
        <MainWrapper>
            <TopDash/>
            <Content>
                <Headline>Let&apos;s work together!</Headline>
                <ContactStack>
                    <Subheading>Contact me</Subheading>
                    <SocialLink
                        href="https://www.linkedin.com/in/shelbyreilly"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIconDark/>
                    </SocialLink>
                </ContactStack>
            </Content>
        </MainWrapper>
    )
}
