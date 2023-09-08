import { useContext } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import { ThemeContext } from './contexts/theme.context'

function App() {

  const { theme } = useContext(ThemeContext)

  return (
    <>

      <div className={`App ${theme}`}>
        {theme == "dark" && <style>
          {`html {background-color: black;}`}
        </style>}
        <Navigation />
        <AppRoutes />
        <Footer />
      </div>
    </>
  )
}

export default App
