import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import eventsService from "../../services/events.services";
import uploadServices from "../../services/upload.services"
import MapsAutocomplete from "../MapsAutocomplete/MapsAutocomplete";

const NewEventForm = ({ fireFinalActions }) => {
    const [eventData, setEventData] = useState({
        title: '',
        icon: '',
        description: '',
        attendees: '',
        address: '',
        date: '',
        organizer: ''
    })


    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {

        const { value, name } = e.currentTarget

        setEventData({ ...eventData, [name]: value });
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setEventData({ ...eventData, icon: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })

    }

    const handleEventSubmit = e => {

        e.preventDefault()

        eventsService
            .saveEvent(eventData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="NewEventForm">
            <Form onSubmit={handleEventSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text"
                        value={eventData.title}
                        name="title"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Icon</Form.Label>
                    <Form.Control type="file"
                        onChange={handleFileUpload}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"
                        value={eventData.description}
                        name="description"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <MapsAutocomplete eventData={eventData} setEventData={setEventData}>
                        <Form.Control type="text"
                            value={eventData.address}
                            name="address"
                            placeholder="Address"
                            onChange={handleInputChange}
                        />
                    </MapsAutocomplete>
                </Form.Group>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="datetime-local"
                        value={eventData.date}
                        name="date"
                        onChange={handleInputChange} />
                </Form.Group>
                <Button variant="dark" type="submit" className='mt-2'>
                    Submit Event
                </Button>
            </Form>
        </div >

    )
}

export default NewEventForm

