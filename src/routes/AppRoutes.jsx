import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import NewEventForm from '../components/NewEventForm/NewEventForm'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import CreativePage from '../pages/CreativePage/CreativePage'
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm'
import Homepage from '../pages/Homepage/Homepage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Homepage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/saveEvent'} element={<NewEventForm />} />
            <Route path={'/creative/:creative_id'} element={<CreativePage />} />
            <Route path={'/newsubscription'} element={<SubscriptionForm />} />

            <Route element={<PrivateRoute />}>
                <Route path={'/userProfile'} element={<ProfilePage />} />
            </Route>

            <Route path={'*'} element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRoutes