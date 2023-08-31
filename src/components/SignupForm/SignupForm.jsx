import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.services"
import calculateAge from "../../utils/calculateAge"

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        birth: '',
        avatar: '',
        role: '',
        email: '',
        password: '',
        pronouns: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

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

        const age = calculateAge(signupData.birth)

        if (age < 18) {
            console.log("You must be 18 or older to sign up.")
            return
        }

        authService
            .signup({ ...signupData })
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <p>By signing up to Q+Creatives you are accepting our <a href="#">Terms and Conditions</a>.
                Learn more about how we process your data in our <a href="#">Privacy policy</a>
                and our <a href="#">Cookies policy</a>.</p>

            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pronouns">
                    <Form.Label>Pronouns</Form.Label>
                    <Form.Control type="text" value={signupData.pronouns} onChange={handleInputChange} name="pronouns" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="role">
                    <Form.Label>Creative or patron?</Form.Label>
                    <Form.Control as="select" value={signupData.role} onChange={handleInputChange} name="role">
                        <option value="">.......</option>
                        <option value="USER">Patron</option>
                        <option value="CREATIVE">Creative</option>
                    </Form.Control>
                </Form.Group>

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
                    <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
                </Form.Group>


                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Register'}</Button>
                </div>

            </Form>
        </div>
    )
}

export default SignupForm
