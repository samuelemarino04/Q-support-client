import { Col } from "react-bootstrap"
import './CreativeCard.css'
import { Link } from "react-router-dom"

const CreativeCard = ({ _id, username, avatar }) => {

    return (
        <>
            <Col lg={{ span: 4 }} md={{ span: 6 }}>
                <div className="appcard">
                    <div className="Card">
                        <div className="upper-container">
                            <div className="image-container">
                                <img src="https://media.vogue.mx/photos/5de92ccaf1bbef0008e5a100/2:3/w_1920,c_limit/the-devil-wears-prada-miranda-priestly.jpg" alt="#" height='100px' width='100px' />
                            </div>
                        </div>
                        <div className="lower-container">
                            <h4>{username}</h4>
                            <h3>algo</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolor neque accusantium quos ratione quo nemo quod perferendis ut, velit repudiandae quam impedit quis suscipit ducimus sint ad vel maxime.</p>
                            <button><Link to={'/creative/:creative_id'} className="nodeco">Visit Profile</Link></button>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default CreativeCard