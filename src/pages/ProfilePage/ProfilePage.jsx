import { useContext } from 'react'
import { AuthContext } from './../../contexts/auth.context'

const ProfilePage = () => {

    // TODO: INTEGRAR COMPONENTE

    const { loggedUser } = useContext(AuthContext)

    return (
        <UserProfile loggedUser={loggedUser} />
    )
}

export default ProfilePage

