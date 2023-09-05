import axios from 'axios'

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/user`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUsers() {
        return this.api.get(`/getAllUsers`)
    }

    getUserDetails(user_id) {
        return this.api.get(`/getOneUser/${user_id}`)
    }

    saveUser(userData) {
        return this.api.post(`/saveUser`, userData)
    }

    deleteUser(user_id) {
        //     console.log("este es el user id", user_id)
        return this.api.delete(`/deleteUser/${user_id}`)
    }

    // editProfile(user_id, user) {
    //     return this.api.put(`/${user_id}/editProfile`, user)
    // }

    editCreative(userData, id) {
        return this.api.post(`/editCreative/${id}`, userData)
    }

    removePhotoCreative(images) {
        return this.api.post(`/removePhotoCreative`, images)
    }
}
const userService = new UserService()
export default userService

