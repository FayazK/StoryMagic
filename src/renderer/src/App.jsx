import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Layout
import AppLayout from './components/AppLayout'

// Pages
import HomeDashboard from './pages/HomeDashboard'
import StoryCreator from './pages/StoryCreator'
import StoryLibrary from './pages/StoryLibrary'
import StoryReader from './pages/StoryReader'
import SettingsPage from './pages/SettingsPage'

// CSS
import './assets/main.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <HomeDashboard />
            </AppLayout>
          }
        />
        <Route
          path="/create"
          element={
            <AppLayout>
              <StoryCreator />
            </AppLayout>
          }
        />
        <Route
          path="/library"
          element={
            <AppLayout>
              <StoryLibrary />
            </AppLayout>
          }
        />
        <Route path="/reader/:id" element={<StoryReader />} />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
