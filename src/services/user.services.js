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
        return this.api.delete(`/deleteUser/${user_id}`)
    }

    editProfile(user_id, signupData) {
        return this.api.put(`/editProfile/${user_id}`, signupData)
    }

    editCreative(_id, userData) {
        return this.api.post(`/editCreative/${_id}`, userData)
    }

    editCardInfo(user_id, formData) {
        return this.api.put(`/editCardInfo/${user_id}`, { formData })
    }

    removePhotoCreative(images) {
        return this.api.post(`/removePhotoCreative`, images)
    }

    getUserSubscriptions(_id) {
        return this.api.get(`/userSubscriptions/${_id}`)
    }
}

const userService = new UserService()

export default userService

