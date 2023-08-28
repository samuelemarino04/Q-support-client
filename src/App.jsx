import { useState } from 'react'
import { useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/footer'
import Navigation from './components/navigation/navigation'
import { ThemeContext } from './contexts/theme.context'

function App() {

  const { theme } = useContext(ThemeContext)

  return (
    <>
      <div className={`App ${theme}`}>
        <Navigation></Navigation>
        <AppRoutes></AppRoutes>
        <Footer />
      </div>
    </>
  )
}

export default App
