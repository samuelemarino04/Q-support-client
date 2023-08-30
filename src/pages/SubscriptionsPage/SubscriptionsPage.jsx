import { Col, Container, Row } from 'react-bootstrap'
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard'





const SubscriptionsPage = () => {

    return (
        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <SubscriptionCard />

                </Col>
            </Row>

        </Container>
    )
}

export default SubscriptionsPage