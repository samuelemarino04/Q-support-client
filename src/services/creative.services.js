import axios from 'axios'

class CreativeService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/creative`
        })
    }

    getCreatives() {
        return this.api.get(`/getAllCreatives`)
    }

    // getUserDetails(user_id) {
    //     return this.api.get(`/getOneUser/${user_id}`)
    // }

    // saveUser(userData) {
    //     return this.api.post(`/saveUser`, userData)
    // }
}
const creativeService = new CreativeService()
export default creativeService