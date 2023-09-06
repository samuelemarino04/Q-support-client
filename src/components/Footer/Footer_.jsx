import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-5">
            <Container>
                <Row>
                    <Col>
                        <h5>About us</h5>
                        <ul className="list-unstyled">
                            <li>Opción 1</li>
                            <li>Opción 2</li>
                            <li>Opción 3</li>
                        </ul>
                    </Col>
                    <Col>
                        <h5>Profiles</h5>
                        <ul className="list-unstyled">
                            <li>Opción A</li>
                            <li>Opción B</li>
                            <li>Opción C</li>
                        </ul>
                    </Col>
                    <Col>
                        <h5>Columna 3</h5>
                        <ul className="list-unstyled">
                            <li>Opción X</li>
                            <li>Opción Y</li>
                            <li>Opción Z</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;


