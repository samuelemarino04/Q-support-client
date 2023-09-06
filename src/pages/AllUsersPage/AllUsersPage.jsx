import { Form, useParams } from "react-router-dom"
import { useContext, useState, useEffect } from 'react';
import userService from '../../services/user.services';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import Loader from "../../components/Loader/Loader";
import { Row, Button } from "react-bootstrap";
import UserCard from "../../components/UserCard/UserCard";



const AllUsersPage = () => {

    const { loggedUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])


    useEffect(() => {
        loadUserDetails();
    }, [])


    const loadUserDetails = () => {

        userService
            .getUsers()
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }
    // console.log("estos son los users", )
    const handleDeleteUser = (user_id, e) => {
        e.preventDefault();

        userService
            .deleteUser(user_id)
            .then(() => {
                loadUserDetails()
            })
            .catch(err => console.log(err));
    }

    return (
        !users ? (
            <Loader />
        ) : (
            <>
                <Row>
                    {users.map(eachUser => (
                        <div key={eachUser._id} className="d-flex align-items-center">
                            <UserCard {...eachUser} />
                            <Button
                                variant="dark"
                                type="button"
                                onClick={(e) => handleDeleteUser(eachUser._id, e)}
                            >
                                Delete User
                            </Button>
                        </div>
                    ))}
                </Row>
            </>
        )
    )
}

export default AllUsersPage