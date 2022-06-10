import { Navbar, Container, Button as BTN } from 'react-bootstrap'
import Chip from '@mui/material/Chip';
import MUIButton from '../Button/Button'
import React, { useContext} from 'react'
import MUIDialog from '../Dialog/Dialog'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Context } from '../../redux/core/context/context';
const DevNavbar = () => {
    const contextValues = useContext(Context)
    const {isLoading, handleDevSignout, open, setIsOpen} = contextValues
    const handlecancel = () => {
        setIsOpen(false)
    }
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                Developer Portal <Chip label="v1.0 BETA" color="success" />
                
                </Navbar.Brand>
                {
                    MUIButton({
                        stylish : {float : 'right'},
                        variant : 'outlined',
                        buttonName : 'Sign out',
                        color : 'error',
                        onhandleClick : () => setIsOpen(true)
                    })
                }
                {
                     MUIDialog({
                        title : 'Sign out',
                        message : 'Are you sure you want to sign out ?',
                        handleYes : () => handleDevSignout(2),
                        handleCancel : handlecancel,
                        isopen: open
                    })
                }
                </Container>
            </Navbar>
            <Backdrop
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      open={isLoading}
                                    >
                                      <CircularProgress color="inherit" />
                                    </Backdrop>
        </>
    )
}

export default DevNavbar