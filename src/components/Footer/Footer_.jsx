import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
    return (
        <footer className="mt-5">
            <Container>
                <Row className="justify-content-end">
                    <Col md={4}>
                        <section>
                            <h5>ABOUT US</h5>
                            <h6>Purpose</h6>
                            <h6>Expected Behavior</h6>
                            <h6>Privacy</h6>
                        </section>
                    </Col>
                    <Col md={4}>
                        <section>
                            <h5>CONTACT</h5>

                        </section>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
