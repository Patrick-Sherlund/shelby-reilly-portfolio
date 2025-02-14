import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProviderWrapper from './theme/ThemeProvider'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ThemeProviderWrapper>
        <App />
    </ThemeProviderWrapper>
)
