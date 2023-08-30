import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import EventCard from '../EventCard/EventCard'


const EventsList = ({ events }) => {

    return (
        !events ?
            <Loader />
            :
            <>
                <Row>
                    {
                        events.map((event) => < EventCard {...event} key={event._id} />)
                    }
                </Row>
            </>
    )

}

export default EventsList