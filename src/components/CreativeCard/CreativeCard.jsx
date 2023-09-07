import { Col } from "react-bootstrap"
import './CreativeCard.css'
import { Link } from "react-router-dom"

const CreativeCard = ({ _id, username, avatar, category, aboutInfo, backgroundImage }) => {

    const maxCharacters = 200

    const truncatedAboutInfo = aboutInfo.length > maxCharacters ? `${aboutInfo.slice(0, maxCharacters)}...` : aboutInfo

    return (
        <Col lg={{ span: 4 }} md={{ span: 6 }}>
            <div className="CreativeCard">
                <div className="Card">
                    <div className="upper-container">
                        <div className="image-container">
                            <img src={avatar} alt="#" height='100px' width='100px' />
                        </div>
                    </div>
                    <div className="lower-container">
                        <h4>{username}</h4>
                        <h3>{category}</h3>
                        <p className="text-multiline">{truncatedAboutInfo}</p>
                        <Link className={'btn btn-outline-dark nodeco'} to={`/creative/${_id}`}>Visit Profile</Link>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default CreativeCard