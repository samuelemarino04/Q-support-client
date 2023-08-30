import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import { useParams, Link } from "react-router-dom"


const CreativeProfile = () => {
    const { user_id } = useParams()


    return (
        <Container>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Cosas
                    </Card.Text>
                </Card.Body>
            </Card>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Tab content for Contact
                </Tab>
            </Tabs>

        </Container>
    )
}

export default CreativeProfile