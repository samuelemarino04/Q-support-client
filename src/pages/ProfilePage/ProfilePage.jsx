import { useContext } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import Loader from '../../components/Loader/Loader'

const ProfilePage = () => {


    const { loggedUser } = useContext(AuthContext)

    return (
        !loggedUser ?
            <Loader />
            :
            <h1>{loggedUser.username} Profile</h1>
    )
}

export default ProfilePage