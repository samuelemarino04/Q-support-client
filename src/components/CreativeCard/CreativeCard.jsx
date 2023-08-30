import { Col } from "react-bootstrap"
import './CreativeCard.css'
import { Link } from "react-router-dom"

const CreativeCard = ({ _id, username, avatar }) => {

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
                        <h3>algo</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolor neque accusantium quos ratione quo nemo quod perferendis ut, velit repudiandae quam impedit quis suscipit ducimus sint ad vel maxime.</p>
                        <Link className={'btn btn-outline-dark nodeco'} to={'/creative/:creative_id'}>Visit Profile</Link>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default CreativeCard