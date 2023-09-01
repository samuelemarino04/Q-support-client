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
}

const creativeService = new CreativeService()
export default creativeService