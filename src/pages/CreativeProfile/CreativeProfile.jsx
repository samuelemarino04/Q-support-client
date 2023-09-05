import { Button, Container, Form, Modal, } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"
import uploadServices from '../../services/upload.services';
import SubscriptionsPage from '../SubscriptionsPage/SubscriptionsPage'
import CreativeEventsPage from '../CreativeEventsPage/CreativeEventsPage';
import SignupForm from '../../components/SignupForm/SignupForm';


const CreativeProfile = () => {

    const { user_id } = useParams()
    const [creative, setCreative] = useState({})
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
            .then(({ data }) => {
                const updatedImages = [...creative.images]
                setCreative({ ...creative, images: updatedImages })
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

    return (
        !creative ?
            <Loader />
            :
            <>
                <Button variant="dark" onClick={() => setShowModal(true)}>Edit profile</Button>

                <Container>

                    <Tabs
                        defaultActiveKey="Work"
                        id="fill-tab-example"
                        className="mb-3"
                    >

                        <Tab eventKey="Work" title="Work">
                            <div className="work-content" key={creative._id}>
                                <header>
                                    {creative.username}
                                    <img src={creative.avatar} alt="avatar" style={{ height: '200px', width: '150px' }} />

                                </header>

                                {
                                    creative.images ?
                                        creative.images.map(eachImage => {
                                            return (
                                                <>
                                                    <Container>

                                                        <img key={eachImage} src={eachImage} alt="image"
                                                            style={{ height: '200px', width: '150px' }} />
                                                        <Form onSubmit={handleRemoveSubmit(eachImage)}>
                                                            <Button variant='dark' type='submit' >
                                                                delete image</Button>
                                                        </Form>
                                                    </Container>


                                                </>
                                            )
                                        })
                                        :
                                        ''
                                }
                            </div>

                            <Form onSubmit={handleFormSubmit}>
                                <Form.Control type="file" multiple onChange={handleFileUpload}>
                                </Form.Control>

                                <Button variant='dark' type='submit' >Upload image</Button>
                            </Form>

                        </Tab >

                        <Tab eventKey="subscriptions" title="Subscriptions" >
                            < SubscriptionsPage creative={creative} owner_id={user_id} />
                        </Tab>

                        <Tab eventKey="About" title="About">
                            Tab content for work, gallery of images, music etc.
                        </Tab>

                        <Tab eventKey="Events" title="Events">
                            Tab content for your programmed events
                            <CreativeEventsPage creative={creative} owner_id={user_id} />

                        </Tab>
                        {/* {/* <Tab eventKey="contact" title="Open Projects" disabled>
                    Tab content for Contact
                </Tab> */}
                    </Tabs >
                </Container >

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