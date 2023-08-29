import { useState } from "react";
import Form from 'react-bootstrap/Form';

const NewEventForm = ({ fireFinalActions }) => {
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
        location: {
            type: 'Point',
            coordinates: [0, 0]
        },
        date: '',
        organizer: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        if (name.includes(".")) {
            const [parentField, nestedField] = name.split(".");
            setEventData({
                ...eventData,
                [parentField]: {
                    ...eventData[parentField],
                    [nestedField]: value
                }
            });
        } else {
            setEventData({ ...eventData, [name]: value });
        }
    }

    const handleEventSubmit = e => {
        e.preventDefault()


        eventServices
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
                <Form.Group className="mb-3" controlId="icon">
                    <Form.Label>Icon</Form.Label>
                    <Form.Control type="text"
                        value={eventData.icon}
                        name="icon"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"
                        value={eventData.description}
                        name="description"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="attendees">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"
                        value={eventData.attendees}
                        name="attendees"
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
                <Form.Group className="mb-3" controlId="location">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"
                        value={eventData.date}
                        name="date"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="organizer">
                    <Form.Label>Organizer</Form.Label>
                    <Form.Control type="text"
                        value={eventData.organizer}
                        name="organizer"
                        onChange={handleInputChange} />
                </Form.Group>
            </Form>
        </div>

    )
}
export default NewEventForm

