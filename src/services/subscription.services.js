import axios from 'axios'

class SubscriptionService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/subscriptions`
        })
    }

    getSubscription() {
        return this.api.get(`/getAllSubscriptions`)
    }

    getSubscriptionsDetails(subscription_id) {
        return this.api.get(`/getOneSubscription/${subscription_id}`)
    }

    saveSubscription(subscriptionData) {
        return this.api.post(`/saveSubscription`, subscriptionData)
    }
}
const subscriptionService = new SubscriptionService()
export default subscriptionService









