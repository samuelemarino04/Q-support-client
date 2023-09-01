import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
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
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </>
    )
}

export default UserProfile