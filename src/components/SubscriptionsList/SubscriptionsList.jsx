import SubscriptionCard from '../SubscriptionCard/SubscriptionCard'
import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'

const SubscriptionsList = ({ subscriptions }) => {

    return (
        !subscriptions ?
            <Loader />
            :
            <>
                <Row>
                    {
                        subscriptions.map(elm => <SubscriptionCard key={elm._id} {...elm} />)
                    }
                </Row>
            </>
    )

}

export default SubscriptionsList