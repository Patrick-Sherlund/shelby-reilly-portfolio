import {css} from "@emotion/react";
import {SxProps} from "@mui/material";


export const overlayContainer: SxProps = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "hidden",
};


export const checkboxContainer: SxProps = {
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 9999,
    backgroundColor: "#0E1224",
    padding: "4px 8px",
    borderRadius: "4px",
};


export const detectionLabel = css`
    position: absolute;
    background-color: rgba(14, 18, 36, 0.6);
    color: #fff;
    padding: 4px;
    border: 1px solid #010413;
    font-size: 12px;
    pointer-events: none;
    white-space: nowrap;
`;


export const detailBox = css`
    position: absolute;
    background-color: #0e1224;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #010413;
    pointer-events: auto;
    z-index: 10000;
    font-size: 13px;
    min-width: 120px;
`;


export const subDetectionTooltip = css`
    position: absolute;
    background-color: #0e1224;
    color: #fff;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #010413;
    pointer-events: none;
    font-size: 12px;
    z-index: 10000;
`;


export const svgStyles = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;
