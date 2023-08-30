// TODO: LIMPIAR IMPORTACIONES EN DESUSO

// TODO: PLURALIZAR TODO LO RELATIVO A LOTES

import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import userService from '../../services/user.services'
import CreativesList from '../../components/CreativesList/CreativesList_'

const Homepage = () => {

    const [creatives, setCreatives] = useState()

    useEffect(() => {
        loadCreatives()
    }, [])

    const loadCreatives = () => {
        userService
            .getUsers()
            .then(({ data }) => setCreatives(data))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <h1>hey</h1>
            {/* TODO: DESACOPLAT FILTRO AQUI */}
            <CreativesList creatives={creatives} />
        </Container>
    )
}

export default Homepage