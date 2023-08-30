import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import CreativeCard from '../CreativeCard/CreativeCard'


const CreativeList = ({ creative }) => {

    return (
        !creative ?
            <Loader />
            :
            <>
                <div>
                    <form className="Search">
                        <input type="text" className="Search-box" placeholder="Filter" />
                    </form>
                </div>
                <Row>
                    {
                        creative.map(elm => <CreativeCard {...elm} />)
                    }
                </Row>
            </>
    )

}

export default CreativeList