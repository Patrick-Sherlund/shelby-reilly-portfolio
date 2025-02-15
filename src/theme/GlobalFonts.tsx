import React from 'react'
import { GlobalStyles } from '@mui/material'

export default function GlobalFonts() {
    return (
        <GlobalStyles
            styles={`
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Bold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Oblique.ttf') format('truetype');
          font-weight: 400;
          font-style: italic;
        }
        /* Repeat for any other .ttf variants */
      `}
        />
    )
}
