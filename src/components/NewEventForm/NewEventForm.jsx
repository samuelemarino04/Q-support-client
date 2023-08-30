import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import eventsService from "../../services/events.services";
import uploadServices from "../../services/upload.services"


const NewEventForm = ({ }) => {
    const [eventData, setEventData] = useState({
        title: '',
        icon: '',
        description: '',
        attendees: '',
        address: {
            street: '',
            number: '',
            zipcode: '',
            city: '',
            country: ''
        },
        // location: {
        //     type: 'Point',
        //     coordinates: [0, 0]
        // },
        date: '',
        organizer: ''
    })

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

        console.log('--------------------FOTITOOOO', formData)

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
                // fireFinalActions()
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
                        // value={eventData.icon}
                        name="icon"
                        onChange={handleFileUpload} />
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
                        value={eventData.address.street}
                        name="address.street"
                        placeholder="Street"
                        onChange={handleInputChange}
                    />
                    <Form.Control
                        type="number"
                        value={eventData.address.number}
                        name="address.number"
                        placeholder="Number"
                        onChange={handleInputChange}
                    />
                    <Form.Control
                        type="text"
                        value={eventData.address.zipcode}
                        name="address.zipcode"
                        placeholder="Zip Code"
                        onChange={handleInputChange}
                    />
                    <Form.Control
                        type="text"
                        value={eventData.address.city}
                        name="address.city"
                        placeholder="City"
                        onChange={handleInputChange}
                    />
                    <Form.Control
                        type="text"
                        value={eventData.address.country}
                        name="address.country"
                        placeholder="Country"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="number"
                        value={eventData.location.coordinates[0]}
                        name="location.coordinates[0]"
                        placeholder="Latitude"
                        onChange={handleInputChange}
                    />
                    <Form.Control
                        type="number"
                        value={eventData.location.coordinates[1]}
                        name="location.coordinates[1]"
                        placeholder="Longitude"
                        onChange={handleInputChange}
                    />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"
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

