import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <>
            <h1>Error 404, not found :/</h1>
            <Link to="/">
                <Button variant="dark">Go to homepage</Button>
            </Link>
        </>
    )
}

export default NotFoundPage