import axios from 'axios'

class UserService {
    constructor() {
        this.api = axios.create({
            baseUrl: `${import.meta.env.VITE_API_URL}/user`
        })
    }

    getUser() {
        return this.api.get(`/getAllUser`)
    }

    getUserDetails(user_id) {
        return this.api.get(`/getOneUser/${user_id}`)
    }

    saveUser(userData) {
        return this.api.post(`/saveUser`, userData)
    }
}
const userService = new UserService()
export default userService