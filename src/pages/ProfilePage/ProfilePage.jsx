import { useContext } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import Loader from '../../components/Loader/Loader'
import UserProfile from '../../components/UserProfile/UserProfile'

const ProfilePage = () => {

    // TODO: INTEGRAR COMPONENTE

    const { loggedUser } = useContext(AuthContext)

    return (
        <UserProfile loggedUser={loggedUser} />
    )
}

export default ProfilePage

