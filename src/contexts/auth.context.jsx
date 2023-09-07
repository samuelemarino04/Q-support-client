import { createContext, useEffect, useState } from "react"
import authService from './../services/auth.services'
import { useNavigate } from "react-router"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()


    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(response => {
                    setLoggedUser(response.data.loggedUser)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        } else {
            logout()
        }
    }


    const logout = () => {

        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsLoading(false)
        navigate('/')
    }


    const storeToken = authToken => localStorage.setItem('authToken', authToken)

    useEffect(() => {
        authenticateUser()
    }, [])


    return (
        <AuthContext.Provider value={{ loggedUser, authenticateUser, logout, storeToken, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }