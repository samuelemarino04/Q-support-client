import { Button, Container } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";

//WIP: (esta hecho en el signup pero molaria sacarlo de ahí)
//  crear el modal para que el user meta su about( un formulario con un unico textArea de texto???)

const AboutPage = (creative) => {

    const [showModal, setShowModal] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    return (
        !creative ? <Loader /> :
            <>
                <Container>
                    {loggedUser?._id === creative._id && (
                        <Button variant="dark" onClick={() => setShowModal(true)}>
                            Edit About
                        </Button>
                    )}

                    <p>heeeey estoy en construssssión{creative.aboutInfo}</p>
                </Container>
                {/* ... aqui meter la modal para el edit ... */}
            </>
    );
}

export default AboutPage