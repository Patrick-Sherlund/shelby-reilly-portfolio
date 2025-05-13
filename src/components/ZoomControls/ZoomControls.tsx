import React from 'react'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong'
import { ControlsWrapper } from './ZoomControls.styles'

type ZoomControlsProps = {
    scale: number
    pos: { x: number; y: number }
    onZoomIn: () => void
    onZoomOut: () => void
    onReset: () => void
}

export default function ZoomControls({ scale, pos, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
    const isDefault = scale === 1 && pos.x === 0

    return (
        <ControlsWrapper>
            <IconButton onClick={onZoomOut}>
                <RemoveIcon />
            </IconButton>
            <Typography>{Math.round(scale * 100)}%</Typography>
            <IconButton onClick={onZoomIn}>
                <AddIcon />
            </IconButton>
            {!isDefault && (
                <IconButton onClick={onReset}>
                    <CenterFocusStrongIcon />
                </IconButton>
            )}
        </ControlsWrapper>
    )
}
