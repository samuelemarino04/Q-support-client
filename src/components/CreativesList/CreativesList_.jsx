import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import CreativeCard from '../CreativeCard/CreativeCard'


const CreativesList = ({ creatives }) => {

    return (
        !creatives ?
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
                        creatives.map(elm => <CreativeCard {...elm} key={elm._id} />)
                    }
                </Row>
            </>
    )

}

export default CreativesList