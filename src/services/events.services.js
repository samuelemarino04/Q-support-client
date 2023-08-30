import axios from 'axios'

class EventService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/events`
        })
    }

    getEvents() {
        return this.api.get(`/getAllEvents`)
    }

    getEventDetails(event_id) {
        return this.api.get(`/getOneEvent/${event_id}`)
    }

    saveEvent(eventData) {
        return this.api.post('/saveEvent', eventData)
    }
}
const eventsService = new EventService()
export default eventsService









