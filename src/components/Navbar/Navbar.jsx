import * as React from 'react'
import { Navbar, Container, Button as BTN } from 'react-bootstrap'
import PropTypes from 'prop-types';
import MUIButton from '../Button/Button'
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
import CircularProgress from '@mui/material/CircularProgress'
import MUIText from '../TextField/TextField'
import Swal from 'sweetalert2'
import Backdrop from '@mui/material/Backdrop'
import { useDispatch, useSelector } from 'react-redux';
import {pushLogin} from '../../redux/core/loginSlice'
import { useHistory } from 'react-router-dom';
import BasicSelect from '../Select/Select'
import authenticationRoutes from "../../router/authroute"

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
  username : '', password : '', userLogin: true, role : ''
}
const roleArray = [
  {
    value : 'client', label : 'CB - Client Branch'
  },
  {
    value : 'developer', label : 'DB - Developer Branch'
  }
]
const NavigationBar = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
    const history = useHistory()
    const [isSuccessLogin, setSuccessLogin] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)
    const [open, setIsOpen] = React.useState(false)
    const [BDOpen, setBDOpen] = React.useState(false)
    const [loginState, setLoginState] = React.useState(loginObject)
    const [roleIdentify, setRole] = React.useState('')
    const [errorRequest, setErrorRequest] = React.useState({
      errorHandler : {
        errorLoggerUsername : false,
        errorLoggerPassword : false,
        errorLoggerRole : false
      }
    })
    const [token, loginSuccess] = useSelector((state) => [
      state.login.token,
      state.login.loginSuccess
    ])
    const tokenref = React.useRef(token)
    const loginSuccessref = React.useRef(loginSuccess)
    const isLoginRedirection = React.useRef(isSuccessLogin)
    const dispatch = useDispatch();

    React.useEffect(() => {
      tokenref.current = token
      loginSuccessref.current = loginSuccess
      isLoginRedirection.current = isSuccessLogin
    }, [token, loginSuccess, isSuccessLogin])

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
        loginObject.role = undefined
        return {loginObject}
      })
    }
    const pushtoPlatform = () => {
      return <Redirect as={HashLink} to={appRouter.devPlatform.path} />
    }
    const onSignin = () => {
      if(loginState.loginObject === undefined){
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerUsername = true
          errorHandler.errorLoggerPassword = true
          return {errorHandler}
        })
        setHelperText("Empty field")
        Toast.fire({
          icon: 'error',
          title: 'Empty fields. please try again.'
        })
        return false
      } else if(!loginState.loginObject.username || !loginState.loginObject.password) { 
        Toast.fire({
          icon: 'error',
          title: 'Empty username or password.'
        })
        return false
      } else { 
        setIsOpen(false)
        setLoading(true)
        setTimeout(() => dispatch(pushLogin(loginState.loginObject)), 1000)
        
        setTimeout(() => {
          console.log(tokenref.current)
          if(tokenref.current[0].key.message === 'success_developer') {
            //login
            Toast.fire({
              icon: 'success',
              title: 'Successfully logged in.'
            })
            setLoading(false)
            localStorage.setItem("key_identifier", tokenref.current[0].key.uid)
            history.push({
              pathname: appRouter.devPlatform.path,
              search : "?secure=" + authenticationRoutes.hashURL(100),
              state : {secure : authenticationRoutes.hashURL(100)}
            })
          } else if(tokenref.current[0].key === 'PASSWORD_INVALID'){
            Toast.fire({
              icon: 'error',
              title: 'Password invalid.'
            })
            setIsOpen(true)
            setLoading(false)
          }
           else { 
            Toast.fire({
              icon: 'error',
              title: 'Username does not exist.'
            })
            setIsOpen(true)
            setLoading(false)
            
          }
        }, 2000)
      }
    }
    const handleCloseBackDropLoading = () => {
      setLoading(false)
    }
    const handleRole = (event) => {
      if(event.target.value === null || event.target.value === ''){
        setRole("")
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerRole = true
          return {errorHandler}
        })
        setLoginState(prevState => {
          let loginObject = Object.assign({}, prevState.loginObject)
          loginObject.role = ""
          return {loginObject}
        })
        setHelperText("Kindly select system")
      } else {
        setRole(event.target.value)
        setLoginState(prevState => {
          let loginObject = Object.assign({}, prevState.loginObject)
          loginObject.role = event.target.value
          return {loginObject}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerRole = false
          return {errorHandler}
        })
        setHelperText("")
      }
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
            <div style={{marginBottom: '10px'}}>
            {BasicSelect({ 
                                              value : roleIdentify,
                                              handleSelect : handleRole,
                                              selectionArray : roleArray,
                                              selectionTitle : 'Branch',
                                              isError : errorRequest.errorHandler.errorLoggerRole
                                            })}
            </div>
            {
               MUIButton({
                variant : "text",
                onhandleClick : onBDOpen,
                buttonName: "Create an account"
              })
            }
            {
              
        BDOpen ? (
          <>
            {backDropAwait()}
          </>
            ) : (
              <>
              
              </>
            )
          }
      
        </DialogContent>
        <DialogActions>
          {
            MUIButton({
              variant : "contained",
              onhandleClick : onSignin,
              size : "small",
              buttonName: "Sign in"
            })
          }
        </DialogActions>
      </BootstrapDialog>
      
      <Backdrop
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      open={isLoading}
                                      onClick={handleCloseBackDropLoading}
                                    >
                                      <CircularProgress color="inherit" />
                                    </Backdrop>
      
        </div>
        
    )
}


export default NavigationBar