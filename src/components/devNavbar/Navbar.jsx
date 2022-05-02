import { Navbar, Container, Button as BTN } from 'react-bootstrap'

const DevNavbar = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                Developer Portal
                </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default DevNavbar