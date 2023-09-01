import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
<<<<<<< HEAD
import NewEventForm from '../components/NewEventForm/NewEventForm'
=======
import NewEventPage from '../pages/Neweventpage/newEventPage'
import PrivateRoute from './PrivateRoute'
>>>>>>> fb9e7e55777166b5732813b29713f2db38af6891
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm'
import Homepage from '../pages/Homepage/Homepage'
import EventPage from '../pages/EventPage/EventPage'
import SubscriptionsPage from '../pages/SubscriptionsPage/SubscriptionsPage'
import CreativeProfile from '../pages/CreativeProfile/CreativeProfile'
import EventDetailsPage from '../pages/eventDetailsPage/eventDetailsPage'


const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Homepage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/creative/:user_id'} element={<CreativeProfile />} />
            <Route path={'/newsubscription'} element={<SubscriptionForm />} />
            <Route path={'/events'} element={<EventPage />} />
            <Route path={'/getOneEvent/:event_id'} element={<EventDetailsPage />} />
            <Route path={'/newEvent'} element={<NewEventPage />} />


            <Route path={'/getSubscriptionsByOwner/:owner_id'} element={<SubscriptionsPage />} />

            {/* <Route element={<PrivateRoute />}>
                
            </Route> */}

            <Route path={'*'} element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRoutes