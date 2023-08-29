import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'



const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/userProfile'} element={<ProfilePage />} />
            <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes