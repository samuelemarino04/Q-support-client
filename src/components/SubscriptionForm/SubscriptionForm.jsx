
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import subscriptionService from '../../services/subscription.services';
import { useNavigate } from "react-router-dom"
import uploadServices from '../../services/upload.services';

const SubscriptionForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        creative: '',
        type: '',
        amount: '',
        image: '',
        // startDate: '',
        // endDate: '',
        // paymentMethod: '',
        // cardHolder: '',
        // cardNumber: '',
        // cvv: '',

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
            .then(() => navigate('/login'))
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
                {/* <FloatingLabel controlId="floatingInputGrid" label="@Creative" className="mb-3">
                    <Form.Control
                        type="text"
                        name="creative"
                        value={formData.creative}
                        onChange={handleInputChange}
                        placeholder="Creative"
                    />
                </FloatingLabel> */}
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
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="Pro">Pro</option>
                    </Form.Select>
                </FloatingLabel>

                {/* <FloatingLabel controlId="floatingInputGrid" label="Start Date" className="mb-3">
                    <Form.Control
                        type="Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        placeholder="Start Date"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputGrid" label="End Date" className="mb-3">
                    <Form.Control
                        type="Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        placeholder="End Date"
                    />
                </FloatingLabel> */}

                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        Payment method
                    </Form.Label>
                    <Form.Check
                        type="radio"
                        label="Debit card/Credit Card"
                        name="paymentMethod"
                        value="Debit card/Credit Card"
                        checked={formData.paymentMethod === 'Debit card/Credit Card'}
                        onChange={handleInputChange}
                        id="formHorizontalRadios1"
                    />
                    <Form.Check
                        type="radio"
                        label="Paypal"
                        name="paymentMethod"
                        value="Paypal"
                        onChange={handleInputChange}
                        id="formHorizontalRadios2"
                    />
                    <Form.Check
                        type="radio"
                        label="Apple Pay"
                        name="paymentMethod"
                        value="Apple Pay"
                        onChange={handleInputChange}
                        id="formHorizontalRadios3"
                    />
                </Form.Group>
                {formData.paymentMethod === 'Debit card/Credit Card' && (
                    <>
                        <Container className='d-flex'>
                            <FloatingLabel controlId="floatingInputGrid" label="Card Holder" className="m-2 w-25">
                                <Form.Control
                                    type="text"
                                    name="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInputGrid" label="Card Number" className="m-2 w-25">
                                <Form.Control
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="Credit Card Number"
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInputGrid" label="CVV" className="m-2 w-25">
                                <Form.Control
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="CVV"
                                />
                            </FloatingLabel>
                        </Container>
                    </>
                )}
                <Button variant="dark" type="submit" className='mt-2'>
                    Submit Payment
                </Button> */}

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Submit'}</Button>
                </div>

            </Container>
        </Form >
    );
};

export default SubscriptionForm