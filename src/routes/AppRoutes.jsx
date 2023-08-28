import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/registro'} element={<SignupPage />} />
            <Route path={'/inicio-sesion'} element={<LoginPage />} />

            <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes