import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/auth.context'
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard"
import SignupForm from '../../components/SignupForm/SignupForm'


const UserProfile = () => {

    const { user_id } = useParams()
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const { loggedUser, logout } = useContext(AuthContext)
    const [subscriptions, setSubscriptions] = useState([]);
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        loadUserDetails()
        loadUserSubscriptions()
    }, [])

    const loadUserDetails = () => {
        userService
            .getUserDetails(user_id)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err))


    }
    const loadUserSubscriptions = () => {
        userService
            .getUserSubscriptions(user_id)
            .then(({ data }) => setSubscriptions(data))
            .catch(err => console.log(err))
    }

    const handleDeleteUser = () => {

        userService
            .deleteUser(user_id)
            .then(() => {
                logout()
                navigate('/')
            })
            .catch(err => console.log(err))
    }


    return (
        !user ?
            <Loader />
            :
            <>
                <Container>

                    <h1 className="mb-4">Welcome to your profile, {user.username}</h1>
                    <p>Pronouns: {user.pronouns}</p>
                    <Button variant="dark" onClick={handleDeleteUser}>Delete profile</Button>
                    <Button variant="dark" onClick={() => setShowModal(true)}>Edit profile</Button>

                    <Row>
                        <Col md={{ span: 4 }}>
                            <img src={user.avatar} style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <h2>My subscriptions</h2>

                    <Row>
                        {subscriptions.map(sub => (
                            <Col key={sub._id} md={4}>
                                <SubscriptionCard {...sub} />
                            </Col>
                        ))}
                    </Row>
                </Container >

                <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit my profile</Modal.Title>
                    </Modal.Header>
                    <SignupForm setShowModal={setShowModal} user={user} />
                </Modal>
            </>
    )
}


export default UserProfile