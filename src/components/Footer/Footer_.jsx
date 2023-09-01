import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-5">
            <Container>
                <Row>
                    <Col>
                        {/* <img className="img" /> */}
                    </Col>
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
    );
};

export default Footer;


// // import CardFooter from 'react-bootstrap/CardFooter'
// import { CardGroup, Card, } from "react-bootstrap"
// const Footer = () => {

//     return (
//         <footer>
//             <CardGroup>
//                 <Card>

//                     <Card.Body>
//                         <Card.Title>Card title</Card.Title>
//                         <Card.Text>
//                             This is a wider card with supporting text below as a natural lead-in
//                             to additional content. This content is a little bit longer.
//                         </Card.Text>
//                     </Card.Body>
//                     <Card.Footer>
//                         <small className="text-muted">Last updated 3 mins ago</small>
//                     </Card.Footer>
//                 </Card>
//                 <Card>

//                     <Card.Body>
//                         <Card.Title>Card title</Card.Title>
//                         <Card.Text>
//                             This card has supporting text below as a natural lead-in to
//                             additional content.{' '}
//                         </Card.Text>
//                     </Card.Body>
//                     <Card.Footer>
//                         <small className="text-muted">Last updated 3 mins ago</small>
//                     </Card.Footer>
//                 </Card>
//                 <Card>

//                     <Card.Body>
//                         <Card.Title>Card title</Card.Title>
//                         <Card.Text>
//                             This is a wider card with supporting text below as a natural lead-in
//                             to additional content. This card has even longer content than the
//                             first to show that equal height action.
//                         </Card.Text>
//                     </Card.Body>
//                     <Card.Footer>
//                         <small className="text-muted">Last updated 3 mins ago</small>
//                     </Card.Footer>
//                 </Card>
//             </CardGroup>

//         </footer>
//     )
// }


// export default Footer