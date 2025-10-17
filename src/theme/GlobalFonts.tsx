import React from 'react'
import { GlobalStyles } from '@mui/material'

export default function GlobalFonts() {
    return (
        <GlobalStyles
            styles={`
        /* ============================= */
        /*  Futura LT (Regular)         */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }

        /* ============================= */
        /*  Futura LT (Bold)            */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Bold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
        }

        /* ============================= */
        /*  Futura LT (Bold Oblique)    */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-BoldOblique.ttf') format('truetype');
          font-weight: 700;
          font-style: italic;
        }

        /* ============================= */
        /*  Futura LT (Book)            */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Book.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }

        /* ============================= */
        /*  Futura LT (Book Oblique)    */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-BookOblique.ttf') format('truetype');
          font-weight: 400;
          font-style: italic;
        }

        /* ============================= */
        /*  Futura LT (Condensed)       */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Condensed.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Condensed Bold)  */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondensedBold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Condensed Bold Oblique) */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondensedBoldOblique.ttf') format('truetype');
          font-weight: 700;
          font-style: italic;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Condensed ExtraBold)   */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondensedExtraBold.ttf') format('truetype');
          font-weight: 800;
          font-style: normal;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Condensed Light) */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondensedLight.ttf') format('truetype');
          font-weight: 300;
          font-style: normal;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Condensed Light Oblique) */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondensedLightObl.ttf') format('truetype');
          font-weight: 300;
          font-style: italic;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Condensed Oblique) */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondensedOblique.ttf') format('truetype');
          font-weight: 400;
          font-style: italic;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Cond ExtraBold Oblique) */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-CondExtraBoldObl.ttf') format('truetype');
          font-weight: 800;
          font-style: italic;
          font-stretch: condensed;
        }

        /* ============================= */
        /*  Futura LT (Extra Bold)       */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-ExtraBold.ttf') format('truetype');
          font-weight: 800;
          font-style: normal;
        }

        /* ============================= */
        /*  Futura LT (Extra Bold Oblique) */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-ExtraBoldOblique.ttf') format('truetype');
          font-weight: 800;
          font-style: italic;
        }

        /* ============================= */
        /*  Futura LT (Heavy)            */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Heavy.ttf') format('truetype');
          font-weight: 900;
          font-style: normal;
        }

        /* ============================= */
        /*  Futura LT (Heavy Oblique)    */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-HeavyOblique.ttf') format('truetype');
          font-weight: 900;
          font-style: italic;
        }

        /* ============================= */
        /*  Futura LT (Light)            */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Light.ttf') format('truetype');
          font-weight: 300;
          font-style: normal;
        }

        /* ============================= */
        /*  Futura LT (Light Oblique)    */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-LightOblique.ttf') format('truetype');
          font-weight: 300;
          font-style: italic;
        }

        /* ============================= */
        /*  Futura LT (Oblique)          */
        /* ============================= */
        @font-face {
          font-family: 'Futura LT';
          src: url('${process.env.PUBLIC_URL}/fonts/FuturaLT-Oblique.ttf') format('truetype');
          font-weight: 400;
          font-style: italic;
        }

        /* ============================= */
        /*  Gloria Hallelujah (Regular)  */
        /* ============================= */
        @font-face {
          font-family: 'Gloria Hallelujah';
          src: url('${process.env.PUBLIC_URL}/fonts/GloriaHallelujah-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
      `}
        />
    )
}
