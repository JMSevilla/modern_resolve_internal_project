import { Navbar, Container, Button as BTN } from 'react-bootstrap'
import Chip from '@mui/material/Chip';
import MUIButton from '../Button/Button'
import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { appRouter } from '../../router/route';
import { pushSignout } from '../../redux/core/signoutSlice';
import MUIDialog from '../Dialog/Dialog'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
const DevNavbar = () => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [keyIdentifier, setkeyIdentifier] = React.useState('')
    const [trackDispatch, setTrack] = useState(false)
    const [
        signoutMessage
    ] = useSelector((state) => [state.signout.signoutMessage])
    const signoutref = useRef(signoutMessage)
    const trackref = useRef(trackDispatch)
    useEffect(() => {
        signoutref.current = signoutMessage
        trackref.current = trackDispatch
        setkeyIdentifier(JSON.parse(localStorage.getItem('keySaved'))[0].uid)
       
    }, [signoutMessage, trackDispatch])
    const history = useHistory()
    const dispatch = useDispatch()
    
    const handleSignout = () => {
        setOpen(true)
    }
    const handleAgree = () => {
        //request to backend destroying token
        setOpen(false)
        setIsLoading(true)
        setTrack(true)
        const key = keyIdentifier
        setTimeout(() => {
            if(trackref.current) {
                dispatch(pushSignout(key))
            } else {}
        }, 2000)
        setTimeout(() => {
            
            if(trackref.current) {
                if(signoutref.current[0].key === 'SIGNOUT_SUCCESS' || signoutref.current[0].key === undefined){
                    setTrack(false)
                    history.push(appRouter.Homepage.path)
                    localStorage.setItem('key_identifier', 'unknown');
                    localStorage.setItem('keySaved', 'unknown');
                    
            } else {
                setIsLoading(false)
            }
            }else{

            }
        }, 3000)
    }
    const handlecancel = () => {
        setOpen(false)
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
                        onhandleClick : handleSignout
                    })
                }
                {
                     MUIDialog({
                        title : 'Sign out',
                        message : 'Are you sure you want to sign out ?',
                        handleYes : handleAgree,
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