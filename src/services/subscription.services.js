import axios from 'axios'

class SubscriptionService {
    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/subscriptions`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getSubscriptions() {
        return this.api.get(`/getAllSubscriptions`)
    }

    getSubscriptionDetails(subscription_id) {
        return this.api.get(`/getOneSubscription/${subscription_id}`)
    }

    getSubscriptionsByOwner(owner) {
        return this.api.get(`/getSubscriptionsByOwner/${owner}`)
    }

    saveSubscription(subscriptionData) {
        return this.api.post(`/saveSubscription`, subscriptionData)
    }
}
const subscriptionService = new SubscriptionService()
export default subscriptionService









