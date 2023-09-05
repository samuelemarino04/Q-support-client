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

    getSubscriptionsByOwner(ownerId) {
        return this.api.get(`/getSubscriptionsByOwner/${ownerId}`)
    }

    saveSubscription(subscriptionData) {
        return this.api.post(`/saveSubscription`, subscriptionData)
    }

    editSubscription(subscription_id, subscriptionData) {
        return this.api.put(`/editSubscription/${subscription_id}`, subscriptionData)
    }

    deleteSubscription(subscription_id) {
        return this.api.delete(`/deleteSubscription/${subscription_id}`)
    }

    subscribe(subscription_id, loggeduser_id) {
        return this.api.put(`/subscribe/${subscription_id}`, loggeduser_id)
    }

    unsubscribe(subscription_id, loggeduser_id) {
        return this.api.put(`/unsubscribe/${subscription_id}`, loggeduser_id)
    }

}
const subscriptionService = new SubscriptionService()
export default subscriptionService