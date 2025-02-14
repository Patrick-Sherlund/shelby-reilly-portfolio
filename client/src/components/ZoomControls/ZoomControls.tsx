import React from 'react'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { ControlsWrapper } from './ZoomControls.styles'

type ZoomControlsProps = {
    scale: number
    onZoomIn: () => void
    onZoomOut: () => void
}

export default function ZoomControls({ scale, onZoomIn, onZoomOut }: ZoomControlsProps) {
    return (
        <ControlsWrapper>
            <IconButton onClick={onZoomOut}>
                <RemoveIcon />
            </IconButton>
            <Typography>{Math.round(scale * 100)}%</Typography>
            <IconButton onClick={onZoomIn}>
                <AddIcon />
            </IconButton>
        </ControlsWrapper>
    )
}
