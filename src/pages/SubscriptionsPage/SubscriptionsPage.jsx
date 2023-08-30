import { Col, Container, Row } from 'react-bootstrap'
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'


const SubscriptionsPage = () => {
    return (
        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Subscriptions</h1>

                    <hr />

                    <SubscriptionForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SubscriptionsPage