import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import EventCard from '../EventCard/EventCard'


const CreativeEvents = ({ events }) => {

    return (
        !events ?

            <Loader />
            :
            <>
                <Row>
                    {
                        events.map(elm =>
                            <EventCard {...elm} key={elm._id} />
                        )
                    }
                </Row>
            </>


    )
    console.log(events)
}

export default CreativeEvents