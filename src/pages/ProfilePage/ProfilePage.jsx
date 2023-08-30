import { useContext } from 'react'
import { AuthContext } from './../../contexts/auth.context'

const ProfilePage = () => {

    // TODO: INTEGRAR COMPONENTE

    const { loggedUser } = useContext(AuthContext)

    return (
        <h1>hey</h1>
    )
}

export default ProfilePage

