import { useContext, useEffect, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.services"
import { isValidForSignup } from "../../utils/calculateAge"
import * as Constants from '../../consts/consts'
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"


const SignupForm = ({ setShowModal }) => {

    const emptySignupForm = {
        username: '',
        birth: '',
        avatar: '',
        role: '',
        category: '',
        email: '',
        password: '',
        pronouns: ''
    }

    const { loggedUser } = useContext(AuthContext)
    const [signupData, setSignupData] = useState(emptySignupForm)
    const [loadingImage, setLoadingImage] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        loggedUser && editingUser()
    }, [])


    const editingUser = () => {
        userService
            .getUserDetails(loggedUser._id)
            .then(({ data }) => setSignupData(data))
            .catch(err => console.log(err))
    }


    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }


    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }


    const handleFormSubmit = e => {

        e.preventDefault()

        if (!isValidForSignup(signupData.birth)) {
            console.log("You must be 18 or older to sign up.")
            return
        }

        authService
            .signup(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }


    const handleEditUser = e => {
        e.preventDefault()

        userService
            .editProfile(loggedUser._id, signupData)
            .then(() => setShowModal(false))
            .catch(err => console.log(err))
    }


    return (

        <div>
            {!loggedUser && <p>By signing up to Q+Creatives you are accepting our
                <a href="#">Terms and Conditions</a>.
                Learn more about how we process your data in our <a href="#">Privacy policy</a>
                and our <a href="#">Cookies policy</a>.</p>}

            <Form onSubmit={loggedUser ? handleEditUser : handleFormSubmit}>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" value={signupData.username}
                        onChange={handleInputChange} name="username" />
                </Form.Group>

                {signupData.avatar && <Card.Img variant="top" src={signupData.avatar} />}

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pronouns" >
                    <Form.Label>Pronouns</Form.Label>
                    <Form.Control type="text" value={signupData.pronouns}
                        onChange={handleInputChange} name="pronouns" />
                </Form.Group>

                {!loggedUser &&
                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Creative or patron?</Form.Label>
                        <Form.Control as="select" value={signupData.role}
                            onChange={handleInputChange} name="role">
                            <option value="">.......</option>
                            <option value="USER">Patron</option>
                            <option value="CREATIVE">Creative</option>
                        </Form.Control>
                    </Form.Group>}

                {loggedUser?.role === "CREATIVE" || !loggedUser &&
                    < Form.Group className="mb-3" controlId="category">
                        <Form.Label>Select your category</Form.Label>
                        <Form.Control as="select"
                            value={signupData.category} onChange={handleInputChange} name="category">
                            {Constants.CREATIVE_CATEGORIES.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>}

                {!loggedUser &&
                    <>
                        <Form.Group className="mb-3" controlId="birth">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={signupData.birth}
                                onChange={handleInputChange}
                                name="birth"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={signupData.password}
                                onChange={handleInputChange} name="password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={signupData.email}
                                onChange={handleInputChange} name="email" />
                        </Form.Group>
                    </>}

                {loggedUser ?
                    <div className="d-grid">
                        <Button variant="dark" type="submit" disabled={loadingImage}>
                            {loadingImage ? 'Loading Image' : 'Edit'}</Button>
                    </div>
                    :
                    <div className="d-grid">
                        <Button variant="dark" type="submit" disabled={loadingImage}>
                            {loadingImage ? 'Loading Image' : 'Register'}</Button>
                    </div>}
            </Form>
        </div >
    )
}

export default SignupForm
