import { Button, Container, Form, Modal, Row, Col, ButtonGroup } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"
import uploadServices from '../../services/upload.services';
import SubscriptionsPage from '../SubscriptionsPage/SubscriptionsPage'
import CreativeEventsPage from '../CreativeEventsPage/CreativeEventsPage';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import SignupForm from '../../components/SignupForm/SignupForm';
import AboutPage from '../AboutPage/AboutPage';
import './CreativeProfile.css'



const CreativeProfile = () => {

    const { user_id } = useParams()
    const [creative, setCreative] = useState({})
    const navigate = useNavigate()
    const { loggedUser, logout } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        loadCreativeDetails()
    }, [])


    const loadCreativeDetails = () => {
        userService
            .getUserDetails(user_id)
            .then(({ data }) => setCreative(data))
            .catch(err => console.log(err))
    }


    const handleFormSubmit = e => {

        e.preventDefault()

        const { imageToUpload: images } = creative

        userService
            .editCreative({ images: creative.imageToUpload }, user_id)
            .then(() => {
                const images = [...creative.images, ...creative.imageToUpload]
                setCreative({ ...creative, images })
            })
            .catch(err => console.log(err))
    }


    const handleRemoveSubmit = (eachImage) => e => {

        e.preventDefault()

        userService
            .removePhotoCreative({ images: eachImage })
            .then(() => {
                const images = [...creative.images]
                setCreative({ ...creative, images })
            })
            .catch(err => console.log(err))
    }


    const handleFileUpload = e => {

        const formData = new FormData()

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imagesData', e.target.files[i])
        }

        uploadServices
            .uploadimages(formData)
            .then(({ data }) => {
                setCreative({ ...creative, imageToUpload: data.cloudinary_urls })
            })
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
        !creative ?
            <Loader />
            :
            <>
                <div className="CreativeProfile">
                    <div className="CreativeHeader">
                        <div className="up-container" style={{ backgroundImage: `url(${creative.backgroundImage})` }} >
                            <div className="imageProfile-container">
                                <img src={creative.avatar} alt="avatar" className='avatarfoto' style={{ position: 'absolute', top: '450px', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
                            </div>

                        </div>
                    </div>
                    <div className="low-container">
                        <div className="bio-icon">
                            <Col>
                                <Row>
                                    <p>{creative.username} • <small>({creative.pronouns})</small></p>
                                </Row>
                                <Row>
                                    <p>{creative.category}</p>
                                </Row>
                                <img src="/public/images/instagram.png" alt="instagram" style={{ width: '20px', height: '20px' }} className="icons" />
                                <img src="/public/images/linkedin.png" alt="linkedin" style={{ width: '20px', height: '20px' }} className="icons" />
                                <img src="/public/images/youtube.png" alt="youtube" style={{ width: '30px', height: '30px' }} className="icons" />
                            </Col>
                        </div>
                    </div> {loggedUser?._id === user_id &&
                        <div className='buttonGroup'>
                            <ButtonGroup aria-label="Basic example" size='sm' className='mb-3 custom-margin-left'>
                                <Button variant="outline-info" onClick={() => setShowModal(true)}>Edit profile</Button>
                                <Button variant="outline-dark" onClick={handleDeleteUser}>Delete Profile</Button>
                            </ButtonGroup>
                        </div>
                    }
                </div>
                <Container>

                    <Tabs
                        defaultActiveKey="Work"
                        id="fill-tab-example"
                        className="mb-3 justify-content-center"

                    >
                        <Tab eventKey="Work" title="Work">
                            <div className="work-content" key={creative._id}>

                                {/* TODO: DESACOPLAR EN CREATIEVGALLERY O COMO MINIMO EN GALLERYCARD */}
                                {
                                    creative?.images?.map(eachImage => {
                                        return (
                                            <>
                                                <Container>
                                                    <img key={eachImage} src={eachImage} alt="image"
                                                        style={{ height: '200px', width: '150px' }} />
                                                    {loggedUser?._id === user_id &&
                                                        <Form onSubmit={handleRemoveSubmit(eachImage)}>
                                                            <Button variant='dark' type='submit' >
                                                                delete image</Button>
                                                        </Form>
                                                    }
                                                </Container>
                                            </>
                                        )
                                    })

                                }
                            </div>
                            {loggedUser?._id === user_id &&
                                <Form onSubmit={handleFormSubmit}>
                                    <Form.Control type="file" multiple onChange={handleFileUpload}>
                                    </Form.Control>
                                    <Button variant='outline-info' type='submit' className='mt-3'>Upload image</Button>
                                </Form>
                            }
                        </Tab >
                        <Tab eventKey="subscriptions" title="Subscriptions" >
                            < SubscriptionsPage creative={creative} owner_id={user_id} />
                        </Tab>

                        <Tab eventKey="About" title="About">
                            <AboutPage creative={creative} />
                        </Tab>

                        <Tab eventKey="Events" title="Events">
                            Tab content for your programmed events
                            <CreativeEventsPage creative={creative} owner_id={user_id} />

                        </Tab>
                    </Tabs >

                </Container>

                <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit my profile</Modal.Title>
                    </Modal.Header>
                    <SignupForm setShowModal={setShowModal} creative={creative} />
                </Modal>
            </>
    )
}

export default CreativeProfile