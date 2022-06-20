import * as React from 'react'
import { Navbar, Container, Button as BTN } from 'react-bootstrap'
import PropTypes from 'prop-types';
import MUIButton from '../Button/Button'
import Box from '@mui/material/Box';
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
import { appRouter } from '../../router/route';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'
import MUIText from '../TextField/TextField'
import Swal from 'sweetalert2'
import Backdrop from '@mui/material/Backdrop'
import { useDispatch, useSelector } from 'react-redux';
import BasicSelect from '../Select/Select'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Context} from '../../redux/core/context/context'
import {Chip} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

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

 const clientObject = {
    newpass: '', conpass: ''
 }
const roleArray = [
  {
    value : 'client', label : 'CB - Client Branch'
  },
  {
    value : 'developer', label : 'DB - Developer Branch'
  }
]
  const email = "paladbryanj@gmail.com";
  const randomCode = Math.floor(100000 + Math.random() * 900000);

const NavigationBar = () => {
  const contextValues = React.useContext(Context)
  const { 
    handleSigninUsername,
    settings,
    isLoading, 
    handleSigninPassword,
    handleSigninRole,
     handleSigninProceed, open, handleSignin, handleClose, handleCloseBackDropLoading , createAccountNavigate} = contextValues
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
    const [isSuccessLogin, setSuccessLogin] = React.useState(false)
    
    const [modalEmail, setEmailModal] = React.useState(false)
    const [modalSecQuestion, setSecQuestionModal] = React.useState(false)
    const [BDOpen, setBDOpen] = React.useState(false)
    const [loginState, setLoginState] = React.useState(loginObject)
    const [clientState, setClientState] = React.useState(clientObject)
    const [roleIdentify, setRole] = React.useState('');
    const [code, setCode] = React.useState('');
    const [sentCode, setSentCode] = React.useState(false);
    const [codeCount, setCodeCount] = React.useState(0);
    const [errorRequest, setErrorRequest] = React.useState({
      errorHandler : {
        errorLoggerUsername : false,
        errorLoggerPassword : false,
        errorLoggerRole : false,
        errorLoggerCode : false,
        errorLoggerNewPass : false,
        errorLoggerConPass : false
      }
    })
    const [token, loginSuccess] = useSelector((state) => [
      state.login.token,
      state.login.loginSuccess
    ])
    const tokenref = React.useRef(token)
    const loginSuccessref = React.useRef(loginSuccess)
    const isLoginRedirection = React.useRef(isSuccessLogin)

    React.useEffect(() => {
      tokenref.current = token
      loginSuccessref.current = loginSuccess
      isLoginRedirection.current = isSuccessLogin
    }, [token, loginSuccess, isSuccessLogin])

    const [errorHelperText, setHelperText] = React.useState('')
    
    const backDropAwait = () => {
      return <Redirect as={HashLink} to={appRouter.Choosepage.path} />
    }
    
    const onRecoverbyEmail = () => {
      if(loginState.loginObject.username === undefined || loginState.loginObject.username === ""){
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerUsername = true
          return {errorHandler}     
        })
        setHelperText("Empty field")
        return false
      } else {
        setEmailModal(true)
        
        setSecQuestionModal(false)
      } 
    }

    const changePasswordbyEmail = () => {
      if(clientState.clientObject === undefined){
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerNewPass = true
          errorHandler.errorLoggerConPass = true
          return {errorHandler}
        })
        setHelperText("Empty field")
        Toast.fire({
          icon: 'error',
          title: 'Empty fields. please try again.'
        })
        return false
      }
      else if(!clientState.clientObject.newpass || !clientState.clientObject.conpass){
          Toast.fire({
            icon: 'error',
            title: 'Empty fields. please try again.'
          })
          return false
        }
        else if(clientState.clientObject.newpass !== clientState.clientObject.conpass)
        {
          Toast.fire({
            icon: 'error',
            title: 'Password does not match! Please try again'
          })
          return false
        }
      else{
        Toast.fire({
          icon: 'success',
          title: 'Password Changed'
        })
      }
     }

    const onRecoverbySecQuestion = () => {
      setSecQuestionModal(true)
      setEmailModal(false)
      
      setSentCode(false)
    }

    const handleCodeSent = (e) => {
      console.log(randomCode);
      if(e.target.value === null || e.target.value === '') {
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerCode = true
          return {errorHandler}
        })
        setCode('');
        setHelperText("Empty code")
        setSentCode(false);
      }
      else{
        if(e.target.value.match(randomCode) && e.target.value.length === 6){
          setSentCode(true);
        } else if (!e.target.value.match(randomCode) && e.target.value.length > 6){
          return false
        } else if (e.target.value.length > 6){
          return false
        }
        else {
          setSentCode(false);
        }
        setCode(prevState => prevState = e.target.value)
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerCode = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }        

    const verifySentCode = (e) => {
      console.log(loginState.loginObject.username + email + randomCode);
      var xhr = new XMLHttpRequest();
      
      xhr.addEventListener('load',() => {
        if(xhr.responseText === "Message has been sent"){
          Toast.fire({
            icon: 'success',
            title: 'Code has been sent! please check your email.'
          })
          setCodeCount(prevState => prevState + 1);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Code could not be sent, Please try again'
          })
        }
      });
      
      xhr.open('GET', 'http://localhost/modern_resolve_intern_project_backend/api/sendemail.php?sendto=' + email + '&name=' + loginState.loginObject.username + '&code=' + randomCode);
      
      xhr.send();

    }

    const handleNewPass = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerNewPass = true
          return {errorHandler}
        })
        setClientState(prevState => {
          let clientObject = Object.assign({}, prevState.clientObject)
          clientObject.newpass = ""
          return {clientObject}
        })
        setHelperText("Empty password")
      }
      else{
        setClientState(prevState => {
          let clientObject = Object.assign({}, prevState.clientObject)
          clientObject.newpass = e.target.value
          return {clientObject}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerNewPass = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleConPass = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerConPass = true
          return {errorHandler}
        })
        setClientState(prevState => {
          let clientObject = Object.assign({}, prevState.clientObject)
          clientObject.conpass = ""
          return {clientObject}
        })
        setHelperText("Empty password")
      }
      else{
        setClientState(prevState => {
          let clientObject = Object.assign({}, prevState.clientObject)
          clientObject.conpass = e.target.value
          return {clientObject}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerConPass = false
          return {errorHandler}
        })
        setHelperText("")
      }
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

    const defaultClientValueSetter = () => {
      setClientState(prevState => {
        let clientObject = Object.assign({}, prevState.clientObject)
        clientObject.newpass = undefined
        clientObject.conpass = undefined
        return {clientObject}
      })
    }
    
   
    
    
    return(
        <div>
            <AppBar style={{backgroundColor : '#121212'}} position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Modern Resolve <Chip label="v1.0 BETA" color="success" />
                </Typography>
                <Button onClick={handleSignin} color="inherit">Login</Button>
              </Toolbar>
      </AppBar>
        
        <BootstrapDialog
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={!open ? false : true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Sign in your account
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <div style={{marginBottom : '20px'}}>
            
            {
                                            MUIText({
                                              typography : "Username",
                                              dataOnChange : (e) => handleSigninUsername(e, 1),
                                              id: "outlined-basic",
                                              label: "Your username",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : settings[1].errorProvider.error_username,
                                              helperTextHelper : settings[1].error_provider_message.epm_username,
                                              value : settings[1].fieldSettings.username
                                            })
                                          }
                                          {
                                            console.log(settings)
                                          }
            </div>
            <div style={{marginBottom : '10px'}}>
       
            {
                                            MUIText({
                                              typography : "Password",
                                              dataOnChange : (e) => handleSigninPassword(e, 1),
                                              id: "outlined-basic",
                                              label: "Your password",
                                              type : "password",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : settings[1].errorProvider.error_password,
                                              helperTextHelper : settings[1].error_provider_message.epm_password,
                                              value : settings[1].fieldSettings.password
                                            })
                                          }
            </div>
            <div style={{marginBottom: '10px'}}>
            {BasicSelect({ 
                                              value : settings[1].fieldSettings.role,
                                              handleSelect : (e) => handleSigninRole(e, 1),
                                              selectionArray : roleArray,
                                              selectionTitle : 'Branch',
                                              placeholder: 'Select Branch',
                                              handleRenderedValue: settings[1].fieldSettings.role
                                            })}
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {
               MUIButton({
                variant : "text",
                onhandleClick : () => createAccountNavigate(),
                buttonName: "Create an account"
              })
            }
             <Box sx={{ flex: '1 1 auto' }} />
            {roleIdentify === 'client' ? (
              MUIButton({
                variant : "text",
                onhandleClick : onRecoverbyEmail,
                buttonName: "Forget Password?"
              })
              
            ):(<></>)}
            </Box>
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
              onhandleClick : () => handleSigninProceed(1),
              size : "small",
              buttonName: "Sign in"
            })
          }
        </DialogActions>
      </BootstrapDialog>

      {/* Primary Option */}
      <BootstrapDialog
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalEmail}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Recover Account by Email
        </BootstrapDialogTitle>
        <DialogContent dividers>
                       <form onSubmit={verifySentCode}>
                        <div className="row">
                          <TextField
                          disabled
                          id="outlined-disabled"
                          label="Username"
                          value={(loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.username}
                          style={{margin: '10px 0px 10px 12px', width: '96%'}}
                        />
                        </div>
                        <div className="row">
                          <TextField
                          disabled
                          id="outlined-disabled"
                          label="Email Address"
                          value={email}
                          // value={(loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.username}
                          style={{margin: '10px 0px 0px 12px', width: '96%'}}
                        />
                        </div>
                        
            <div style={{marginBottom: '10px'}}>
            <Card sx={{ minWidth: 275 }} style={{marginTop: '20px', marginBottom: '20px'}}>
                        <CardContent>
                        <Typography sx={{ fontSize: 16, marginBottom: '20px' }} color="text.primary" gutterBottom>
                          Verification Code will be sent to your email, click send code..
                          </Typography>
                                        {
                                            MUIText({
                                              typography : "",
                                              dataOnChange : handleCodeSent,
                                              id: "outlined-basic",
                                              label: "Enter Code",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerCode,
                                              helperTextHelper : errorHelperText,
                                              value : code
                                            })
                                          }
                                         <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                         {
                                            MUIButton({
                                              variant : "text",
                                              onhandleClick : onRecoverbySecQuestion,
                                              buttonName: "Try Another Way?"
                                            })
                                          }
                                         <Box sx={{ flex: '1 1 auto' }} />
                                         {
                                            MUIButton({
                                              variant : "text",
                                              onhandleClick : verifySentCode,
                                              buttonName: codeCount === 0 ? 'Send Code' : 'Resend Code'
                                            })
                                          }
                                         </Box>
                                         
                       </CardContent>
              </Card>
              
                                      
                                      {sentCode ? (
                                        <>
                                         <div style={{marginBottom : '15px'}}>
                                          {
                                            MUIText({
                                              typography : "",
                                              dataOnChange : handleNewPass,
                                              id: "outlined-basic",
                                              label: "New Password",
                                              type : "password",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerNewPass,
                                              helperTextHelper : errorHelperText,
                                              value : (clientState.clientObject === undefined) ? defaultClientValueSetter : clientState.clientObject.newpass
                                            }) 
                                          }
                                        </div>
                                        <div style={{marginBottom : '15px'}}>
                                          {
                                            MUIText({
                                              typography : "",
                                              dataOnChange : handleConPass,
                                              id: "outlined-basic",
                                              label: "Confirm Password",
                                              type : "password",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerConPass,
                                              helperTextHelper : errorHelperText,
                                              value : (clientState.clientObject === undefined) ? defaultClientValueSetter : clientState.clientObject.conpass
                                            }) 
                                          }
                                        </div>
                                        </>
                                      ):(<></>)}
                                      
            </div>
            </form>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {
            MUIButton({
              variant : "contained",
              onhandleClick : handleSignin,
              size : "small",
              buttonName: "Back"
            })
          } 
            <Box sx={{ flex: '1 1 auto' }} />
            {
               MUIButton({
                variant : "contained",
                onhandleClick : changePasswordbyEmail,
                buttonName: "Change Password"
              })
            }
            {
          }
          </Box>
        </DialogContent>
      </BootstrapDialog>

      {/* 2nd Option */}
      <BootstrapDialog
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalSecQuestion}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Recover Account by Security Q and A
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <div style={{marginBottom : '10px'}}>
                        <div className="row">
                          <TextField
                          disabled
                          id="outlined-disabled"
                          label="Username"
                          value={(loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.username}
                          style={{margin: '10px 0px 0px 12px', width: '96%'}}
                        />
                        </div>
            </div>
            <div style={{marginBottom : '10px'}}>
                        <div className="row">
                          <TextField
                          disabled
                          id="outlined-disabled"
                          label="Security Question"
                          value={(loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.username}
                          style={{margin: '10px 0px 10px 12px', width: '96%'}}
                        />
                        </div>
            </div>
            <div style={{marginBottom: '10px'}}>
                                          {
                                            MUIText({
                                              typography : "",
                                              dataOnChange : handlePassword,
                                              id: "outlined-basic",
                                              label: "Enter your answer",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerPassword,
                                              helperTextHelper : errorHelperText,
                                              value : (loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.password
                                            })
                                          }                         
            </div>
            <div style={{marginBottom: '10px'}}>
                                          {
                                            MUIText({
                                              typography : "",
                                              dataOnChange : handlePassword,
                                              id: "outlined-basic",
                                              label: "New Password",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerPassword,
                                              helperTextHelper : errorHelperText,
                                              value : (loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.password
                                            })
                                          }                       
            </div>
            <div style={{marginBottom: '10px'}}>
                                          {
                                            MUIText({
                                              typography : "",
                                              dataOnChange : handlePassword,
                                              id: "outlined-basic",
                                              label: "Confirm Password",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerPassword,
                                              helperTextHelper : errorHelperText,
                                              value : (loginState.loginObject === undefined) ? defaultValueSetter : loginState.loginObject.password
                                            })
                                          }                      
            </div>
             
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {
            MUIButton({
              variant : "contained",
              onhandleClick : onRecoverbyEmail,
              size : "small",
              buttonName: "Back"
            })
          } 
            <Box sx={{ flex: '1 1 auto' }} />
            {
               MUIButton({
                variant : "contained",
                onhandleClick : onRecoverbyEmail,
                buttonName: "Change Password"
              })
            }
            {
          }
          </Box>
        </DialogContent>
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