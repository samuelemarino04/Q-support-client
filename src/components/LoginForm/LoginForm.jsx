import { useNavigate } from "react-router-dom"
import authService from "../../services/auth.services"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Form, Button, Alert } from "react-bootstrap"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })


    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const { authenticateUser, storeToken } = useContext(AuthContext)



    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }


    const handleSubmit = e => {
        e.preventDefault()
        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => setErrors(err.response.data.message))
    }


    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
            </Form.Group>



            <div className="d-grid">
                <Button variant="dark" type="submit">Log in</Button>
            </div>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
        </Form>
    )
}



export default LoginForm