import { Container, FloatingLabel, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import subscriptionService from '../../services/subscription.services';
import { useNavigate } from "react-router-dom"

const PaymentForm = () => {

    const [formData, setFormData] = useState({
        cardHolder: '',
        paymentMethod: '',
        cardNumber: '',
        cvv: '',
        expiringDate: '',
        startDate: '',
    })

    const navigate = useNavigate()

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


    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <FloatingLabel controlId="floatingInputGrid" label="@Creative" className="mb-3">
                    <Form.Control
                        type="text"
                        name="creative"
                        value={formData.creative}
                        onChange={handleInputChange}
                        placeholder="Creative"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputGrid" label="Start Date" className="mb-3">
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
                </FloatingLabel>

                <Form.Group as={Row} className="mb-3">
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
                </Button>
            </Container>
        </Form >
    )
}

export default PaymentForm