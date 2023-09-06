import { Form, useParams } from "react-router-dom"
import { useContext, useState, useEffect } from 'react';
import userService from '../../services/user.services';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import Loader from "../../components/Loader/Loader";
import { Row } from "react-bootstrap";
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
    const handleDeleteUser = (user_id) => {

        userService
            .deleteUser(user_id)
            .then(() => {
                logout()
                navigate('/getAllUsers')
            })
            .catch(err => console.log(err))
    }


    return (



        !users ?
            <Loader />
            :
            <>
                <Row>

                    {
                        users.map(eachUser => <UserCard {...eachUser} key={eachUser._id} />


                        )

                    }
                </Row>
            </>
    )

}

export default AllUsersPage