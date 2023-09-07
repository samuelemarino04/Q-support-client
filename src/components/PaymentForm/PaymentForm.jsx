import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import userService from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'
import FormError from '../FormError/FormError'


const PaymentForm = ({ handleSubscriptionChange, subscriptionDetails, clients, setShowPaymentModal }) => {

    const { loggedUser } = useContext(AuthContext)
    const [errors, setErrors] = useState([])

    const formatDate = (inputDate) => {
        if (inputDate.length === 4) {
            const month = inputDate.slice(0, 2);
            const year = inputDate.slice(2, 4);
            return `${month}/${year}`;
        }
        return inputDate;
    }
    const [formData, setFormData] = useState({
        cardHolder: '',
        cardNumber: '',
        cvv: '',
        expiringDate: '',
    })




    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        let formattedValue = value

        if (name === 'expiringDate') {
            formattedValue = formatDate(value.replace(/[^0-9]/g, ''));
        }

        setFormData({ ...formData, [name]: formattedValue })
        console.log("esto es el formdata", formData)
    }



    const handleSubmit = (e) => {

        e.preventDefault()

        userService
            .editCardInfo(loggedUser._id, formData)
            .then(() => {
                clients.push(loggedUser._id)
                setShowPaymentModal(false)
                handleSubscriptionChange()
            })
            .catch(err => setErrors(err.response.data.messages))

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <h1><strong>{subscriptionDetails.title}</strong></h1>

                <p>By choosing to support this creative you agree to be charged <strong>{subscriptionDetails.price}{subscriptionDetails.currency}</strong>
                    ({subscriptionDetails.paymentFrequency}) in exchange of the services offered(<em>{subscriptionDetails.description}</em>).</p>
                <hr />
                <h3>Payment Details</h3>
                <hr />
                <h6>Cardholder's name</h6>
                <FloatingLabel controlId="floatingInputGrid" label="Type the carholder's full name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="CardHolder"
                    />
                </FloatingLabel>
                <h6>Card number</h6>
                <FloatingLabel controlId="floatingInputGrid" label="Type the card's full number" className="mb-3">
                    <Form.Control
                        type="Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="cardNumber"
                    />
                </FloatingLabel>
                <Row>
                    <Col>
                        <h6>Expiring date</h6>
                        <FloatingLabel controlId="floatingInputGrid" label="MM/YY" className="m-2 w-100">
                            <Form.Control
                                type="text"
                                name="expiringDate"
                                value={formData.expiringDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <h6>CVV</h6>
                        <FloatingLabel controlId="floatingInputGrid" label="CVV" className="m-2 w-100">
                            <Form.Control
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="CVV"
                            />
                        </FloatingLabel>
                    </Col>
                </Row>


                {errors?.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                <div className="d-flex align-items-center justify-content-center">
                    <Button variant="dark" type="submit" className='mt-2'>
                        Submit Payment
                    </Button>
                </div>
            </Container>
        </Form >
    )
}

export default PaymentForm