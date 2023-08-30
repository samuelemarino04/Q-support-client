import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import CreativeCard from '../CreativeCard/CreativeCard'


const CreativesList = ({ creatives }) => {

    return (

        !creatives ?
            <Loader />
            :
            <>
                <Row>
                    {
                        creatives.map(elm => <CreativeCard {...elm} key={elm._id} />)
                    }
                </Row>
            </>
    )

}

export default CreativesList