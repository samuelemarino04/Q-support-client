import { Button, Col } from "react-bootstrap"


const UserCard = ({ username, _id, rol, avatar, category, email, handleDeleteUser }) => {

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
                        <Button
                            variant="dark"
                            type="button"
                            onClick={(e) => handleDeleteUser(_id, e)}
                        >
                            Delete User
                        </Button>
                    </div>
                </div>

            </div>

        </Col>

    )
}

export default UserCard



