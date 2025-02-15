import React from 'react'
import IntroductionPage from './pages/IntroductionPage/IntroductionPage'
import OverviewPage from './pages/OverviewPage/OverviewPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'

export default function App() {
    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <IntroductionPage />
            <OverviewPage />
            <ProjectsPage />
        </div>
    )
}
