import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import eventsService from '../../services/events.services';
import uploadServices from '../../services/upload.services';


// TODO: EDIT ISSUE - ADAPTAR PROPS FINALKES
function EditEventForm({ fireFinalActions, event }) {

    const [eventData, setEventData] = useState({
        title: event ? event.title : '',
        icon: event ? event.icon : '',
        description: event ? event.description : '',
        attendees: event ? event.attendees : '',
        address: event ? event.address : '',
        date: event ? event.date : '',
        organizer: event ? event.organizer : ''
    });


    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {

        const { value, name } = e.currentTarget

        if (name.includes(".")) {

            const [parentField, nestedField] = name.split(".")

            setEventData({
                ...eventData,
                [parentField]: {
                    ...eventData[parentField],
                    [nestedField]: value
                }
            })
        } else {
            setEventData({ ...eventData, [name]: value });
        }
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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (event) {

            eventsService
                .editEvent(event._id, eventData)
                .then(() => fireFinalActions())
                .catch(err => console.log(err))
        }
    }


    return (
        <div className="EditEventForm">
            <Form onSubmit={handleSubmit}>
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
                    <Form.Control type="text"
                        value={eventData.address}
                        name="address"
                        placeholder="Address"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="datetime-local"
                        value={eventData.date}
                        name="date"
                        onChange={handleInputChange} />
                </Form.Group>
                <Button variant="dark" type="submit" className='mt-2'>
                    Edit Event
                </Button>
            </Form>
        </div >
    )
}

export default EditEventForm;
