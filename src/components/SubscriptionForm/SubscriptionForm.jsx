import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import subscriptionService from '../../services/subscription.services';
import uploadServices from '../../services/upload.services';
import * as Constants from '../../consts/consts'



const emptySubscriptionForm = {
    title: '',
    description: '',
    type: '',
    price: '',
    currency: '',
    paymentFrequency: '',
    image: '',
}

const SubscriptionForm = ({ setShowEditModal, subscription }) => {

    const [formData, setFormData] = useState(emptySubscriptionForm)

    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        subscription && SubscriptionEditing()
    }, [])


    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setFormData({ ...formData, [name]: value })
    }


    const SubscriptionEditing = () => {
        subscriptionService
            .getSubscriptionDetails(subscription._id)
            .then(({ data }) => setFormData(data))
            .catch(err => console.log(err))
    }


    const handleSubmit = (e) => {
        subscriptionService
            .saveSubscription(formData)
            .then(() => setShowEditModal(false))
            .catch(err => console.log(err))
    }


    const handleFileUpload = e => {

        setLoadingImage(true)

        const imageFormData = new FormData()
        imageFormData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(imageFormData)
            .then(({ data }) => {
                setFormData({ ...formData, image: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }


    const handleSubscriptionEditing = e => {
        e.preventDefault()

        subscriptionService
            .editSubscription(subscription._id, formData)
            .then(() => setShowModal(false))
            .catch(err => console.log(err))
    }


    return (

        < Form onSubmit={subscription ? handleSubscriptionEditing : handleSubmit} >
            <Container>
                <FloatingLabel controlId="floatingInputGrid" label="title" className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputGrid" label="description" className="mb-3">
                    <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                </FloatingLabel>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Price">
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Price"
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Select a currency">
                            <Form.Control as="select" onChange={handleInputChange} name="currency">
                                {Constants.CURRENCIES.map((currency, index) => (
                                    <option key={index} value={currency}>{currency}</option>
                                ))}
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Payment frequency">
                            <Form.Control as="select" onChange={handleInputChange} name="paymentFrequency">
                                {Constants.PAYMENT_FREQUENCIES.map((paymentFrequency, index) => (
                                    <option key={index} value={paymentFrequency}>{paymentFrequency}</option>
                                ))}
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>

                {formData.image && <Card.Img variant="top" src={formData.image} />}
                <FloatingLabel controlId="floatingInputGrid" label="image" className="mb-3">
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleFileUpload}
                        placeholder="image" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelectGrid" label="Subscription type">
                    <Form.Control as="select" onChange={handleInputChange} name="type">
                        {Constants.SUBSCRIPTION_TYPES.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </Form.Control>
                </FloatingLabel>
                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Submit'}</Button>
                </div>
            </Container>
        </Form >
    )
}

export default SubscriptionForm