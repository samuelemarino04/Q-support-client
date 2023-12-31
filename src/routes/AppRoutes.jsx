import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm'
import Homepage from '../pages/Homepage/Homepage'
import EventPage from '../pages/EventPage/EventPage'
import SubscriptionsPage from '../pages/SubscriptionsPage/SubscriptionsPage'
import CreativeProfile from '../pages/CreativeProfile/CreativeProfile'
import EventDetailsPage from '../pages/EventDetailsPage/EventDetailsPage'
import { AuthContext } from '../contexts/auth.context'
import { useContext } from 'react'
import UserProfile from '../pages/UserProfile/UserProfile'
import EditEventPage from '../pages/EditEventPage/EditEventPage'
import AllUsersPage from '../pages/AllUsersPage/AllUsersPage'


const AppRoutes = () => {

    const { loggedUser } = useContext(AuthContext)

    return (
        <Routes>
            <Route path={'/'} element={<Homepage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/creative/:user_id'} element={<CreativeProfile />} />
            <Route path={'/user/:user_id'} element={<UserProfile />} />
            <Route path={'/events'} element={<EventPage />} />
            <Route path={'/getOneEvent/:event_id'} element={<EventDetailsPage />} />
            <Route path={'/getSubscriptionsByOwner/:owner_id'} element={<SubscriptionsPage />} />

            <Route element={<PrivateRoute />}>
                <Route path={'/newsubscription'} element={<SubscriptionForm />} />
                <Route path={'/events/:event_id/edit'} element={<EditEventPage />} />
                <Route path={'/newsubscription'} element={<SubscriptionForm />} />
                <Route path={'/getAllUsers'} element={<AllUsersPage />} />
            </Route>

            <Route path={'*'} element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRoutes