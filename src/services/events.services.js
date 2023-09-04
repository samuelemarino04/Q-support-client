import axios from 'axios'

class EventService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/events`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getEvents() {
        return this.api.get(`/getAllEvents`)
    }

    getFilteredEvents(searchQuery) {
        return this.api.get(`/getFilteredEvents/`, {
            params: { searchQuery }
        })
    }

    getEventDetails(event_id) {
        return this.api.get(`/getOneEvent/${event_id}`)
    }

    saveEvent(eventData) {
        return this.api.post('/saveEvent', eventData)
    }

    editEvent(event_id, event) {
        return this.api.put(`/${event_id}/edit-event`, event)
    }

    joinEvent(event_id, user_id) {
        return this.api.post(`/${event_id}/join-event`, user_id)
    }

    unjoinEvent(event_id, user_id) {
        return this.api.post(`/${event_id}/unjoin-event`, user_id)
    }

    removeEvent(event_id) {
        return this.api.post(`/${event_id}/remove-event`)
    }

}
const eventsService = new EventService()
export default eventsService









