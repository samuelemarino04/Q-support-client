import { Col, Button } from "react-bootstrap"

const UserCard = ({ username, rol, avatar, category, email }) => {

    return (
        <Col lg={{ span: 4 }} md={{ span: 6 }}>
            <div className="UserCard">
                <div className="Card">
                    <div className="upper-container">
                        <div className="image-container">
                            <img src={avatar} alt="#" height='100px' width='100px' />
                        </div>
                    </div>
                    <div className="lower-container">
                        <h4>{username}</h4>
                        <h4>{rol}</h4>
                        <h4>{category}</h4>
                        <h4>{email}</h4>
                        <Button variant='dark' type='submit' >
                            Delete User</Button>

                    </div>
                </div>
            </div>
        </Col>

    )
}

export default UserCard



