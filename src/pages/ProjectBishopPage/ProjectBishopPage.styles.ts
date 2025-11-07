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
export const MidSection = styled('div')(({ theme }) => ({
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
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '16px',
        gap: '24px',
    },
}))

// Demo (placeholder) wrapper on the right
export const DemoWrapper = styled('div')(({ theme }) => ({
    width: '55%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pointerEvents: 'auto',
    marginTop: '-80px', // Move video up to center it vertically
    position: 'relative', // For absolute positioning of children
    [theme.breakpoints.down('md')]: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '0',
    },
}))

// iPad background image
export const IpadImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
    position: 'relative',
    zIndex: 1,
}))

// Video element for the web-app demo
export const DemoVideo = styled('video')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% / 1.09)',
    height: 'auto',
    border: '1px solid #1f1f1fff',
    borderRadius: '8px',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'block',
    zIndex: 2,
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
    [theme.breakpoints.down('md')]: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
}))

// Title style
export const Title = styled('h2')(({ theme }) => ({
    margin: 0,
    fontFamily: 'Futura, sans-serif',
    fontWeight: 500,
    fontSize: '64px',
    color: '#AD66FF', // Accent color for Project Bishop
    [theme.breakpoints.down('md')]: {
        fontSize: '48px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '36px',
    },
}))

// Individual line under the title
export const LineText = styled('div')(({ theme }) => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
        fontSize: '24px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
}))

// Button with drop shadow effect
export const CaseStudyButton = styled('button')(({ theme }) => ({
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
    [theme.breakpoints.down('md')]: {
        fontSize: '24px',
        padding: '6px 12px',
        border: '6px solid #FFFFFF',
        '&::after': {
            border: '6px solid #A9A9A9',
            top: '10px',
            left: '10px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        padding: '4px 8px',
        border: '4px solid #FFFFFF',
        '&::after': {
            border: '4px solid #A9A9A9',
            top: '8px',
            left: '8px',
        },
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
