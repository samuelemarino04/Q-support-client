
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import subscriptionService from '../../services/subscription.services';
import { useNavigate } from "react-router-dom"
import uploadServices from '../../services/upload.services';
import { SUBSCRIPTION_TYPES } from '../../consts/subscription.consts';

const SubscriptionForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        creative: '',
        type: '',
        amount: '',
        image: '',
    });

    const navigate = useNavigate()

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        subscriptionService
            .saveSubscription(formData)
            .then(() => navigate(`/getSubscriptionsByOwner/${owner_id}`))
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

    return (
        <Form onSubmit={handleSubmit}>
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
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputGrid" label="amount" className="mb-3">
                    <Form.Control
                        type="number"
                        name="amount"
                        onChange={handleInputChange}
                        placeholder="Amount"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputGrid" label="image" className="mb-3">
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleFileUpload}
                        placeholder="image" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelectGrid" label="Select a package">
                    <Form.Select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        aria-label="Floating label select example"
                        className="mb-3"
                    >
                        <option>Subscription type</option>
                        {
                            SUBSCRIPTION_TYPES.map(elm => <option key={elm} value={elm}>{elm}</option>)
                        }
                    </Form.Select>
                </FloatingLabel>

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Submit'}</Button>
                </div>

            </Container>
        </Form >
    );
};

export default SubscriptionForm