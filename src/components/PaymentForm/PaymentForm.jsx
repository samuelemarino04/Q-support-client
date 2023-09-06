import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import userService from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'

const PaymentForm = ({ clients, setShowPaymentModal }) => {

    const { loggedUser } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        cardHolder: '',
        cardNumber: '',
        cvv: '',
        expiringDate: '',
        startDate: '',
    })


    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = (e) => {

        e.preventDefault()

        userService
            .editCardInfo(loggedUser._id, formData)
            .then(() => {
                clients.push(loggedUser._id)
                return setShowPaymentModal(false)
            })
            .catch(err => console.log(err))

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <p>aqui me traigo el objeto subscription y pinto todos los detallitos y lo dejo todo bonito jejeXD</p>
                <FloatingLabel controlId="floatingInputGrid" label="cardHolder" className="mb-3">
                    <Form.Control
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="CardHolder"
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputGrid" label="cardNumber" className="mb-3">
                    <Form.Control
                        type="Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="cardNumber"
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputGrid" label="expiringDate" className="mb-3">
                    <Form.Control
                        type="Number"
                        name="expiringDate"
                        value={formData.expiringDate}
                        onChange={handleInputChange}
                        placeholder="expiringDate"
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
            <Button variant="dark" type="submit" className='mt-2'>
                Submit Payment
            </Button>
        </Form >
    )
}

export default PaymentForm