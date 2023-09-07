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
    }, [searchQuery, selectedCategories])

    console.log("estas son las categorias selecionadas", selectedCategories)


    const loadCreatives = () => {
        const queryParams = {
            searchQuery,
            category: selectedCategories,
        }

        creativeService
            .getFilteredCreatives(queryParams)
            .then(({ data }) =>
                setFilteredCreatives(data)
            )
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
                        <h3>Filter creative</h3>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder='Search...'
                            className="form-control"
                        />
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">Creatives by Category</Dropdown.Toggle>
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