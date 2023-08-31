import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CreativesList from '../../components/CreativesList/CreativesList_'
import CreativesFilter from '../../components/CreativesFilter/CreativesFilter'
import creativeService from '../../services/creative.services'



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
        creativeService
            .getCreatives()
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