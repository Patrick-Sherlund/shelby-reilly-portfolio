import { styled } from '@mui/material/styles'
import {css} from "@emotion/react";
import {SxProps} from "@mui/material";

// Full-page wrapper similar to IntroductionPage and MedTrackerPage
export const MainWrapper = styled('div')(() => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '24px',
}))

// Top-left logo
export const LogoImage = styled('img')(() => ({
    height: 'clamp(30px, 5vw, 60px)',
    width: 'auto',
    pointerEvents: 'auto',
    alignSelf: 'flex-start',
    margin: '68px 32px 32px 60px',
}))

// Container for the two middle sections (left text, right demo)
export const MidSection = styled('div')(() => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px',
    boxSizing: 'border-box',
    gap: '4vw',
    pointerEvents: 'none',
}))

// Demo (placeholder) wrapper on the right
export const DemoWrapper = styled('div')(() => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-end', // right align within section
    alignItems: 'center',
    pointerEvents: 'auto',
}))

// Placeholder for the web-app UI
export const DemoPlaceholder = styled('div')(() => ({
    width: '100%',
    maxWidth: '800px',
    aspectRatio: '16/9',
    backgroundColor: '#1E1E1E',
    border: '4px solid #FFFFFF',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontFamily: 'Futura, sans-serif',
    fontSize: '24px',
    userSelect: 'none',
}))

// Description column on the left
export const DescriptionWrapper = styled('div')(({ theme }) => ({
    width: '40%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // left align content
    gap: '16px',
    fontFamily: 'Futura, sans-serif',
    fontSize: 'clamp(16px, 2vw, 22px)',
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    textAlign: 'left',
    pointerEvents: 'auto',
}))

// Title style
export const Title = styled('h2')(() => ({
    margin: 0,
    fontFamily: 'Futura, sans-serif',
    fontWeight: 500,
    fontSize: '64px',
    color: '#AD66FF', // Accent color for Project Bishop
}))

// Individual line under the title
export const LineText = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: '#FFFFFF',
}))

// Button with drop shadow effect
export const CaseStudyButton = styled('button')(() => ({
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: '#AD66FF',
    color: '#FFFFFF',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700,
    fontSize: '32px',
    padding: '8px 16px',
    border: '8px solid #FFFFFF',
    boxSizing: 'border-box',
    outline: 'none',
    pointerEvents: 'auto',
    // Drop shadow rectangle via ::after
    '&::after': {
        content: '"READ CASE STUDY"',
        position: 'absolute',
        top: '14px',
        left: '14px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#AD66FF',
        border: '8px solid #A9A9A9',
        zIndex: -1,
    },
})) 

export const stackContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#010413",
    height: "100vh",
    boxSizing: "border-box",
    padding: "16px 0px 16px 24px",
};


export const boxContainer: SxProps = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
};


export const title: SxProps = {
    color: "#FFFFFF",
    mb: 1,
    fontWeight: 500,
};


export const stackStyles = css`
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: 100%;
`;


export const videoBox: SxProps = {
    pt: 1,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
};


export const videoWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
};


export const video = {
    height: "100%",
    width: "100%",
};


export const loadingOverlay: SxProps = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
};
