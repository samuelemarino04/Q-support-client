import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/footer'
import Navigation from './components/navigation/navigation'

function App() {


  return (
    <>
      <div className="app">

        <Navigation></Navigation>
        <h1>hey</h1>
        <Footer />
      </div>
    </>
  )
}

export default App
