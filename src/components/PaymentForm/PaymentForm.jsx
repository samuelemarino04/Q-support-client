import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import userService from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'
import FormError from "../FormError/FormError";


const PaymentForm = ({ clients, setShowPaymentModal }) => {

    const [errors, setErrors] = useState([])
    const { loggedUser } = useContext(AuthContext)

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
        startDate: '',
    })

    const [errors, setErrors] = useState({
        cardHolder: '',
        cardNumber: '',
        cvv: '',
        expiringDate: '',
        startDate: '',
    })


    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        let formattedValue = value

        if (name === 'expiringDate') {
            formattedValue = formatDate(value.replace(/[^0-9]/g, ''));
        }

        setFormData({ ...formData, [name]: formattedValue })
    }



    const handleSubmit = (e) => {

        e.preventDefault()

        userService
            .editCardInfo(loggedUser._id, formData)
            .then(() => {
                clients.push(loggedUser._id)
                return setShowPaymentModal(false)
            })
<<<<<<< HEAD
            .catch(err => setErrors(err.response.data.errorMessages))
=======
            .catch(err => setErrors(err.response.data.errosMessages))
>>>>>>> 94ed2f936804c727933bdfe83eb1e6020f26e6ce

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
                        type="text"
                        name="expiringDate"
                        value={formData.expiringDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
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

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <Button variant="dark" type="submit" className='mt-2'>
                    Submit Payment
                </Button>
            </Container>
        </Form >
    )
}

export default PaymentForm