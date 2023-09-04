import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"



const UserProfile = () => {

    const { user_id } = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        loadUserDetails()
    }, [])

    const loadUserDetails = () => {
        userService
            .getUserDetails(user_id)
            .then(({ data }) => setUser(data))
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

                    <Row>

                        <Col md={{ span: 4 }}>
                            <img src={user.avatar} style={{ width: '100%' }} />
                        </Col>

                    </Row>

                </Container >
            </>
    )
}

export default UserProfile