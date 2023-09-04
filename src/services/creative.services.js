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

    getFilteredCreatives(searchQuery) {
        console.log("2. loadCreatives() accede al servicio y hace la llamada a la api", searchQuery)
        return this.api.get(`/getFilteredCreatives/`, {
            params: { searchQuery }
        })
    }

    getCreativesByCategory(category) {
        console.log("esto es lo que me llega a la funcion getCreativesByCategory", category)
        return this.api.get("/getCreativesByCategory", {
            params: { category }
        })
    }


}
const creativeService = new CreativeService()
export default creativeService
