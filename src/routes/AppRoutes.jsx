import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import NewEventForm from '../components/New EventForm/NewEventForm'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CreativePage from '../pages/CreativePage/CreativePage'
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm'




const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/userProfile'} element={<ProfilePage />} />
            <Route path={'/creative/:creative_id'} element={<CreativePage />} />
            <Route path={'*'} element={<NotFoundPage />} />
            <Route path={'/newevent'} element={<NewEventForm />} />
            <Route path={'/newsubscription'} element={<SubscriptionForm />} />

        </Routes>
    )
}

export default AppRoutes