import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import userService from '../../services/user.services'
import CreativesList from '../../components/CreativesList/CreativesList_'
import CreativesFilter from '../../components/CreativesFilter/CreativesFilter'



const Homepage = () => {

    const [creatives, setCreatives] = useState()
    const [creativesBackup, setCreativesBackup] = useState()

    const filterCreatives = usernameQuery => {
        const filteredCreatives = creativesBackup.filter(elm => elm.username.includes(usernameQuery))
        setCreatives(filteredCreatives)
    }
    useEffect(() => {
        loadCreatives()
    }, [])

    const loadCreatives = () => {
        userService
            .getUsers()
            .then(({ data }) => { setCreatives(data), setCreativesBackup(data) })
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <CreativesFilter filterCreatives={filterCreatives} />
            <CreativesList creatives={creatives} />
        </Container>
    )
}

export default Homepage