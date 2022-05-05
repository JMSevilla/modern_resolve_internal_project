import { Navbar, Container, Button as BTN } from 'react-bootstrap'
import Chip from '@mui/material/Chip';

const DevNavbar = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                Developer Portal <Chip label="v1.0 BETA" color="success" />
                </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default DevNavbar