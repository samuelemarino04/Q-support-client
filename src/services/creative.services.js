import axios from 'axios'

class CreativeService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/creative`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getCreatives() {
        return this.api.get(`/getAllCreatives`)
    }

    getFilteredCreatives(queryParams) {
        console.log("esto es lo que me llega al servicio", queryParams)
        return this.api.get(`/getFilteredCreatives/`, {
            params: queryParams
        })
    }

    getCreativesByCategory(category) {
        return this.api.get("/getCreativesByCategory", {
            params: { category }
        })
    }
}

const creativeService = new CreativeService()
export default creativeService
