import { Button, Modal, Container, Form } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"
import uploadServices from '../../services/upload.services';
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'
import SubscriptionsPage from '../SubscriptionsPage/SubscriptionsPage'


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

        userService
            .editCreative({ images: creative.imageToUpload }, user_id)
            .then(() => {
                const updatedImages = [...creative.images, ...creative.imageToUpload]
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
            .catch(err => {
                console.log(err)
            })
    }
    return (
        !creative ?
            <Loader />
            :
            <>

                <Link className={'btn btn-outline-dark nodeco'} to={`/getSubscriptionsByOwner/${user_id}`}>Become a Patron!</Link>
                <Button variant='dark' size='sm' onClick={() => setShowModal(true)}>new subscription</Button>
                <Container>

                    <Tabs
                        defaultActiveKey="Work"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >

                        <Tab eventKey="Work" title="Work">
                            <div className="work-content">
                                <header>
                                    {creative.username}
                                    <img src={creative.avatar} alt="avatar" style={{ height: '200px', width: '150px' }} />
                                </header>

                                {
                                    creative.images ?
                                        creative.images.map(eachImage => {
                                            return (
                                                <Container>
                                                    <img key={eachImage} src={eachImage} alt="image" style={{ height: '200px', width: '150px' }} />
                                                </Container>
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
                        </Tab>

                        {/* //investigar como meter la info al tab en la docu de bootstrap */}
                        <Tab eventKey="subscription" title="Subscription" >
                            < SubscriptionsPage />
                        </Tab>

                        <Tab eventKey="About" title="About">
                            Tab content for work, gallery of images, music etc.
                        </Tab>

                        {/* <Tab eventKey="contact" title="Open Projects" disabled>
                    Tab content for Contact
                </Tab>
                <Tab eventKey="contact" title="Collaborative projects" disabled>
                    Tab content for Contact
                </Tab> */}
                    </Tabs>

                </Container >

                <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Subscription</Modal.Title>
                    </Modal.Header>
                    <SubscriptionForm setShowModal={setShowModal} />
                </Modal>
            </>
    )
}

export default CreativeProfile