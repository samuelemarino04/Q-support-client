import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Navigation = () => {

    return (
        <Navbar bg="dark" data-bs-theme="dark" className='mb-5' expand="lg">
            <Container>
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className='nav-link'>Home</Link>
                        <Link to={'/'} className='nav-link'>Creatives list</Link>
                        <Link to={'/crear'} className='nav-link'>Events</Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation