import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import NewEventForm from '../components/New EventForm/NewEventForm'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'



const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route path={'/userProfile'} element={<ProfilePage />} />
            </Route>
            <Route path={'*'} element={<NotFoundPage />} />
            <Route path={'/saveEvent'} element={<NewEventForm />} />

        </Routes>
    )
}

export default AppRoutes