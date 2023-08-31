import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"


const CreativeProfile = () => {
    const { user_id } = useParams()
    const [creative, setCreative] = useState({})

    useEffect(() => {
        loadCreativeDetails()
    }, [])

    const loadCreativeDetails = () => {
        userService
            .getUserDetails(user_id)
            .then(({ data }) => setCreative(data))
            .catch(err => console.log(err))

    }

    return (
        !creative ?
            <Loader />
            :
            <>

                <Link className={'btn btn-outline-dark nodeco'} to={'/creative/:_id/subscriptions'}>Become a Patron!</Link>
                <Container>

                    <Tabs
                        defaultActiveKey="About"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >

                        <Tab eventKey="About" title="About">
                            {creative.username}
                            <img src={creative.avatar} alt="avatar" style={{ height: '200px', width: '150px' }} />
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