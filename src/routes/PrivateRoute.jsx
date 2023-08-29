import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import { Navigate, Outlet } from "react-router"
import Loader from "../components/Loader/Loader"

const PrivateRoute = () => {

    const { loggedUser, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!loggedUser) {
        return (<Navigate to="/login" />)
    }

    return <Outlet />
}

export default PrivateRoute