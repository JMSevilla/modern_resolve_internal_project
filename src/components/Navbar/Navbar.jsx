import * as React from 'react'
import { Navbar, Container, Button as BTN } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled as styler } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Redirect } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { appRouter } from '../../router/route'
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import MUIText from '../TextField/TextField'


const BootstrapDialog = styler(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    maxWidth: 'sm'
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
const loginObject = { 
  username : '', password : ''
}
const NavigationBar = () => {
    const [open, setIsOpen] = React.useState(false)
    const [BDOpen, setBDOpen] = React.useState(false)
    const [loginState, setLoginState] = React.useState(loginObject)
    const [errorRequest, setErrorRequest] = React.useState({
      errorHandler : {
        errorLoggerUsername : false,
        errorLoggerPassword : false,
      }
    })
    const [errorHelperText, setHelperText] = React.useState('')
    const handleSignin = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    const backDropAwait = () => {
      return <Redirect as={HashLink} to={appRouter.Registration.path} />
    }
    const onBDOpen = () => {
      setBDOpen(true)
    }
    const handleCloseBackDrop = () => {
      setBDOpen(false)
    }
    const handlePassword = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerPassword = true
          return {errorHandler}
        })
        setLoginState(prevState => {
          let loginObject = Object.assign({}, prevState.loginObject)
          loginObject.password = ""
          return {loginObject}
        })
        setHelperText("Empty password")
      }
      else{
        setLoginState(prevState => {
          let loginObject = Object.assign({}, prevState.loginObject)
          loginObject.password = e.target.value
          return {loginObject}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerPassword = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleUsername = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerUsername = true
          return {errorHandler}
        })
        setLoginState(prevState => {
          let loginObject = Object.assign({}, prevState.loginObject)
          loginObject.username = ""
          return {loginObject}
        })
        setHelperText("Empty username")
      }
      else{
        setLoginState(prevState => {
          let loginObject = Object.assign({}, prevState.loginObject)
          loginObject.username = e.target.value
          return {loginObject}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerUsername = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const defaultValueSetter = () => {
      setLoginState(prevState => {
        let loginObject = Object.assign({}, prevState.loginObject)
        loginObject.username = undefined
        loginObject.password = undefined
        return {loginObject}
      })
    }
    return(
        <div>
            <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src="https://react-bootstrap.github.io/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
            Modern Resolve
            </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <BTN onClick={handleSignin} size="small" variant="outline-primary">Sign in</BTN> 
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <BootstrapDialog
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Sign in your account
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <div style={{marginBottom : '20px'}}>
            
            {
                                            MUIText({
                                              typography : "Username",
                                              dataOnChange : handleUsername,
                                              id: "outlined-basic",
                                              label: "Your username",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerUsername,
                                              helperTextHelper : errorHelperText,
                                              value : (loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.username
                                            })
                                          }
            </div>
            <div style={{marginBottom : '10px'}}>
       
            {
                                            MUIText({
                                              typography : "Password",
                                              dataOnChange : handlePassword,
                                              id: "outlined-basic",
                                              label: "Your password",
                                              type : "password",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerPassword,
                                              helperTextHelper : errorHelperText,
                                              value : (loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.password
                                            })
                                          }
            </div>
            <Button variant="text" onClick={onBDOpen}>Create an account</Button>
            {
              
        BDOpen ? (
          <>
    {/* <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleCloseBackDrop}
            >
              <CircularProgress color="inherit" />
            </Backdrop> */}
            {backDropAwait()}
          </>
        ) : (
          <>
          
          </>
        )
      }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Sign in
          </Button>
        </DialogActions>
      </BootstrapDialog>
      
      
        </div>
        
    )
}


export default NavigationBar