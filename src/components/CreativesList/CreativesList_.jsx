import { Col, Dropdown, Form, Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import CreativeCard from '../CreativeCard/CreativeCard'
import { useEffect, useState } from 'react'
import creativeService from '../../services/creative.services'
import * as Constants from '../../consts/consts'

const CreativesList = () => {

    const [searchQuery, setSearchQuery] = useState('')

    const [filteredCreatives, setFilteredCreatives] = useState([])

    const [selectedCategories, setSelectedCategories] = useState([])


    useEffect(() => {
        loadCreatives()
    }, [searchQuery])

    //the moment I give the useEffect another dependency in the second argument (selectedCategories), 
    //the first filter input bar stops filtering everytime the user press a key
    const loadCreatives = () => {
        console.log("1.con cada cambio en el buscador le pasamos el searchQuery al loadCreatives()", searchQuery)

        Promise.all([
            creativeService.getFilteredCreatives(searchQuery),
            creativeService.getCreativesByCategory(selectedCategories)
        ])

            .then(([{ data }, categoryResponse]) => {
                setFilteredCreatives(data)
            })
    }

    const handleInputChange = (e) => {
        const searchWord = e.target.value
        setSearchQuery(searchWord)

    }

    const handleCategoryToggle = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }


    return (
        !filteredCreatives ?
            <Loader />
            :
            <>
                <Row className="align-items-center">
                    <Col md={6}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder='Type to search'
                            className="form-control"
                        />
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">Find by Category</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Form>
                                    {Constants.CREATIVE_CATEGORIES.map((category) => (
                                        <div key={`${category}`} className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                id={`${category}`}
                                                label={`${category}`}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryToggle(category)}
                                            />
                                        </div>
                                    ))}
                                </Form>
                                <Dropdown.Item href="#/action-1">Search</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row >
                <Row>
                    {
                        filteredCreatives?.map(elm => <CreativeCard {...elm} key={elm._id} />)
                    }

                </Row>
            </>

    )

}

export default CreativesList