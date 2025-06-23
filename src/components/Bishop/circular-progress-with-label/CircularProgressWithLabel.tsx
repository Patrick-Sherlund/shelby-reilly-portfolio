import React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

interface CircularProgressWithLabelProps {
    value: number;
    size: number;
    fontSize: number;
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({value, size, fontSize}) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="determinate"
                value={value}
                size={size}
                sx={{color: "#5BD150"}}
            />
            <Box
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{fontSize: fontSize, color: "#5BD150", fontWeight: "bold"}}
                >
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;
