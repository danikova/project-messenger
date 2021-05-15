import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';

import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

export const GlobalStyle = createGlobalStyle`
    ${styleReset}
    @font-face {
        font-family: 'ms_sans_serif';
        src: url('${ms_sans_serif}') format('woff2');
        font-weight: 400;
        font-style: normal
    }
    @font-face {
        font-family: 'ms_sans_serif';
        src: url('${ms_sans_serif_bold}') format('woff2');
        font-weight: bold;
        font-style: normal
    }
    html {
        font-size: ${({ fontSize }) => `${fontSize * 16}px`} !important;
    }
    * {
    ${({ vintageFont }) => {
        if (vintageFont)
            return `
                font-family: ms_sans_serif !important;
                letter-spacing: 0.1em !important;
            `;
        else
            return `
                font-family: sans-serif !important;
            `;
    }}
    body {
        background-color: ${({ backgroundColor }) => backgroundColor};
    }

    ${({ scanLines, scanLinesIntensity }) => {
        if (scanLines)
            return `@keyframes flicker {
        0% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.27861};
        }
        5% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.34769};
        }
        10% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.23604};
        }
        15% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.90626};
        }
        20% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.18128};
        }
        25% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.83891};
        }
        30% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.65583};
        }
        35% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.67807};
        }
        40% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.26559};
        }
        45% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.84693};
        }
        50% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.96019};
        }
        55% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.08594};
        }
        60% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.20313};
        }
        65% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.71988};
        }
        70% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.53455};
        }
        75% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.37288};
        }
        80% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.71428};
        }
        85% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.70419};
        }
        90% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.7003};
        }
        95% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.36108};
        }
        100% {
        opacity: ${(scanLinesIntensity / 100.0) * 0.24387};
        }
    }

    body {
        &:after {
            content: " ";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(18, 16, 16, 0.1);
            opacity: 0;
            z-index: 10000;
            pointer-events: none;
            animation: flicker 0.15s infinite;
        }
        &:before {
            opacity: 0.7;
            content: " ";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            z-index: 10000;
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
        }
    }
    `;
        return '';
    }}
`;
