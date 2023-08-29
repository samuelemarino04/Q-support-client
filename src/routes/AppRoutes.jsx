import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import NewEventForm from '../components/New EventForm/NewEventForm'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'*'} element={<NotFoundPage />} />
            <Route path={'/newevent'} element={<NewEventForm />} />
        </Routes>
    )
}

export default AppRoutes