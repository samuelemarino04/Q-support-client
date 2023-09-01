import { Button, Container, Form } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import userService from '../../services/user.services';
import Loader from "../../components/Loader/Loader"
import SubscriptionsPage from '../SubscriptionsPage/SubscriptionsPage';
import AddWorkImageForm from '../../components/AddWorkImageForm/AddWorkImageForm'
import uploadServices from '../../services/upload.services';


const CreativeProfile = () => {

    const { user_id } = useParams()
    const [creative, setCreative] = useState({})

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
                <Container>

                    <Tabs
                        defaultActiveKey="About"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >

                        <Tab eventKey="Work" title="Work">
                            {creative.username}
                            <img src={creative.avatar} alt="avatar" style={{ height: '200px', width: '150px' }} />

                            {
                                creative.images ?
                                    creative.images.map(eachImage => {
                                        return (
                                            <img key={eachImage} src={eachImage} alt="image" style={{ height: '200px', width: '150px' }} />
                                        )
                                    })
                                    :
                                    ''
                            }


                            {/* <AddWorkImageForm /> */}

                            <Form onSubmit={handleFormSubmit}>
                                <Form.Control type="file" multiple onChange={handleFileUpload}>
                                </Form.Control>

                                <Button variant='dark' type='submit' >Upload image</Button>
                            </Form>





                        </Tab>

                        {/* //investigar como meter la info al tab en la docu de bootstrap */}
                        <Tab eventKey="subscription" title="Subscription" >
                            {/* < SubscriptionsPage /> */}
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
            </>
    )
}

export default CreativeProfile