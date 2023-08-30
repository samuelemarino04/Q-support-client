import { Button, Container, Modal } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import CreativeList from '../../components/CreativeList/CreativeList'

const Homepage = () => {
    const [creative, setCreative] = useState()

    useEffect(() => {
        loadCoasters()
    }, [])

    const loadCoasters = () => {
        userService
            .getUser()
            .then(({ data }) => setCreative(data))
            .catch(err => console.log(err))
    }
    return (
        <Container>
            <h1>hey</h1>
            <CreativeList creative={creative} />
        </Container>
    )
}

export default Homepage