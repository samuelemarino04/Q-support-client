import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import { useParams, Link } from "react-router-dom"


const CreativeProfile = () => {
    const { user_id } = useParams()


    return (
        <>
            <Link className={'btn btn-outline-dark nodeco'} to={'/creative/:_id/subscriptions'}>Become a Patron!</Link>
            <Container>

                <Tabs
                    defaultActiveKey="About"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >

                    <Tab eventKey="About" title="About">
                        Tab content for Profile
                    </Tab>

                    <Tab eventKey="subscription" title="Subscription">
                        Tab content for Subscriptions
                    </Tab>

                    <Tab eventKey="work" title="Work">
                        Tab content for work, gallery of images, music etc.
                    </Tab>

                    {/* <Tab eventKey="contact" title="Open Projects" disabled>
                    Tab content for Contact
                </Tab>
                <Tab eventKey="contact" title="Collaborative projects" disabled>
                    Tab content for Contact
                </Tab> */}
                </Tabs>

            </Container >
        </>
    )
}

export default CreativeProfile