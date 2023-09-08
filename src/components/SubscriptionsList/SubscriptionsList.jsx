import SubscriptionCard from '../SubscriptionCard/SubscriptionCard'
import { Col, Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'

const SubscriptionsList = ({ loadSubscriptions, subscriptions, setSubscriptions }) => {

    return (
        !subscriptions ?
            <Loader />
            :
            <>
                <Row className="justify-content-center">
                    {subscriptions.map(elm => (
                        <Col key={elm._id} xs={12} sm={6} md={4} lg={3} className="mb-4" style={{ margin: '30px' }}>
                            <SubscriptionCard loadSubscriptions={loadSubscriptions} setSubscriptions={setSubscriptions} {...elm} />
                        </Col>
                    ))}
                </Row>
            </>
    )
}

export default SubscriptionsList