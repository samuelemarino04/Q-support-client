import { useContext } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../contexts/theme.context'
import { AuthContext } from '../../contexts/auth.context'
import './Navigation.css'




const Navigation = () => {

    const { theme, switchTheme, invertedTheme } = useContext(ThemeContext)
    const { loggedUser, logout } = useContext(AuthContext)

    return (
        <Navbar bg={invertedTheme}
            data-bs-theme={invertedTheme}
            expand="lg">
            <Container>
                <Navbar.Brand>{import.meta.env.VITE_APP_NAME}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <img src="/images/lgbtiq+flag.png" alt="foto icono" className="icon-img" />

                    <Nav className="me-auto">

                        <Link to={'/'} className='nav-link'>Home</Link>
                        <Link to={'/events'} className='nav-link'>Events</Link>
                        {loggedUser?.role === "ADMIN" &&
                            <Link to={'/getAllUsers'} className='nav-link'>Creatives Q+ Users</Link>
                        }
                    </Nav>
                    <Nav>
                        {
                            loggedUser?.role === "CREATIVE" &&
                            <>
                                <Link to={`/creative/${loggedUser._id}`} className='nav-link'>My profile</Link>
                                <span className='nav-link' onClick={logout}>Logout</span>
                            </>
                        }
                        {(loggedUser?.role === "USER" || loggedUser?.role === "ADMIN") && (
                            <>
                                <Link to={`/user/${loggedUser?._id}`} className='nav-link'>My profile</Link>
                                <span className='nav-link' onClick={logout}>Logout</span>
                            </>
                        )}
                        {
                            !loggedUser &&
                            <>
                                <Link to={'/signup'} className='nav-link mr-auto'>Sign Up</Link>
                                <Link to={'/login'} className='nav-link mr-auto'>Login</Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                <div className="d-flex">
                    <Button variant='dark' size='sm' onClick={switchTheme} style={{ marginRight: 10, borderRadius: 15 }}>{theme === 'dark' ? '🌞' : '🌙'}</Button>
                    <span className="navbar-text">Hi, {loggedUser ? loggedUser.username : 'user'}!</span>
                </div>
            </Container>
        </Navbar>
    )
}

export default Navigation