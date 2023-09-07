import { Button, Container } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import './AboutPage.css'

const AboutPage = ({ creative }) => {

    const [showModal, setShowModal] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    return (
        !creative ? <Loader /> :
            <>
                <Container className="AboutCard">
                    {loggedUser?._id === creative._id && (
                        <Button variant="dark" onClick={() => setShowModal(true)}>
                            Edit About
                        </Button>
                    )}
                    <p>{creative.aboutInfo}</p>
                </Container>
                {/* ... aqui meter la modal para el edit ... */}
            </>
    );
}

export default AboutPage