import axios from 'axios'

class AuthService {

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/auth`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    signup(userData) {
        console.log('userData desde servicio de auth', userData)
        return this.api.post('/signup', userData)
    }

    login(userData) {
        return this.api.post('/login', userData)
    }

    verify(authToken) {
        return this.api.get('/verify',
            { headers: { Authorization: `Bearer ${authToken}` } }
        )
    }

}

const authService = new AuthService()

export default authService