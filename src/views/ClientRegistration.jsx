// import React from 'react'
// import Navbar from '../components/Navbar/Navbar'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import BasicSelect from '../components/Select/Select'
// import MUIText from '../components/TextField/TextField'
// import Swal from 'sweetalert2'
// import { useDispatch, useSelector } from 'react-redux';
// import Backdrop from '@mui/material/Backdrop'
// import CircularProgress from '@mui/material/CircularProgress'
// import store from '../redux/store'
// // import {checkUser, createUser} from '../redux/core/registration'
// import {checkClient, pushCreateClient} from '../redux/core/registrationSlice'
// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box sx={{ p: 3 }}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }
//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };
  
//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }
//   // CLIENT REGISTRATION //
// const clientSteps = ['Primary Information','Credentials','Request Client Proposal','Payment Method', 'Finish'];
// const infoObjClient = { 
//   clientfname: "", clientlname: "", clientemail: "",
//   clientcontact: "", clientaddress: "", clientusername: "",
//   clientpassword: "", clientconpass: "", clientsecquestion: "", clientsecanswer: '', clientTrigger : true
// }

// const secQuestionsArray = [
//   {
//     label : 'What is your first job position?', value : 'What is your first job position?'
//   },
//   {
//     label : 'What is your favorite food?', value: 'What is your favorite food?'
//   }
// ]

// const ClientRegistration = () => {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener('mouseenter', Swal.stopTimer)
//       toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
//   })

//   //CLIENT REGISTRATION
//   const [
//     clientUserValue,
//     registrationSuccessMessageClient,
//     registrationBooleanClient
//    ] = useSelector((state) => [
//     state.user.clientUserValue,
//     state.user.registrationSuccessMessageClient,
//     state.user.registrationBooleanClient
//   ])
//   const clientref = React.useRef(clientUserValue)
//   const refregisterSuccessClient = React.useRef(registrationSuccessMessageClient)
//   const checkClientRef = React.useRef(registrationBooleanClient)
//   const [value, setValue] = React.useState(0);
//   const [clientActiveStep, setClientActiveStep] = React.useState(0);
//   const [infoStateClient,setInfoStateClient] = React.useState(infoObjClient);
//   const [clientSecQuestion,setClientSecQuestion] = React.useState('');
//   const [isLoading, setLoading] = React.useState(false);
//   const [clientErrorRequest, setClientErrorRequest] = React.useState({
//     errorHandlerClient : {
//       errorLoggerCfname : false,
//       errorLoggerClname : false,
//       errorLoggerCemail : false,
//       errorLoggerCcontact : false,
//       errorLoggerCaddress : false,
//       errorLoggerCusername : false,
//       errorLoggerCpassword : false,
//       errorLoggerCconpass : false,
//       errorLoggerCsecquestion: false,
//       errorLoggerCsecanswer: false
//     }
//   })
//   const [clientEmailErrorRequest, setClientEmailErrorRequest] = React.useState({
//     errorHandlerClient : {
//       errorLoggerCemail : false
//     }
//   })
//   const dispatch = useDispatch();

//   const [errorHelperTextClient, setHelperTextClient] = React.useState('');
//   const [errorEmailTextClient, setEmailTextClient] = React.useState('');

//   const handleChange = (event, newValue) => { 
//     setValue(newValue);
//   };

//   const handleCloseBackDrop = () => {
//     setLoading(false)
//   }
//   React.useEffect(() => {
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientTrigger = true
//       return {infoObjClient}
//     })
//   }, [])

//   React.useEffect(() => {
//     clientref.current = clientUserValue
//     refregisterSuccessClient.current = registrationSuccessMessageClient
//     checkClientRef.current = registrationBooleanClient
//   }, [clientUserValue,
//      registrationSuccessMessageClient,
//       registrationBooleanClient])
  
//     const handleNextCredentialsClient = () => {
//         if(!infoStateClient.infoObjClient.clientusername || !infoStateClient.infoObjClient.clientpassword || 
//           !infoStateClient.infoObjClient.clientconpass || !infoStateClient.infoObjClient.clientsecquestion || !infoStateClient.infoObjClient.clientsecanswer) {
//           Toast.fire({
//             icon: 'error',
//             title: 'Empty fields. please try again.'
//           })
//           return false
//         } else if(infoStateClient.infoObjClient.clientpassword !== infoStateClient.infoObjClient.clientconpass) {
//           Toast.fire({
//             icon: 'error',
//             title: 'Password mismatch'
//           })
//           return false
//         } else {
//           setLoading(true)
//           dispatch(checkClient(infoStateClient.infoObjClient))
//           setTimeout(() => {
//             if(clientref.current[0].key === 'client_username_available'){
//               dispatch(pushCreateClient(infoStateClient.infoObjClient))
//             }
//           }, 1000)
//           setTimeout(() => {
//             if(clientref.current[0].key === "client_username_available") {
//               if(refregisterSuccessClient.current[0].key === "client_registration_success") {
//                 setLoading(false)
//                 Toast.fire({
//                   icon: 'success',
//                   title: 'You have successfully created an account.'
//                 })
//                 setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
//               } 
//             }
//             else {
//               Toast.fire({
//                 icon: 'error',
//                 title: 'Username already taken.'
//               })
//               setLoading(false)
//               return false
//             }
//           }, 2000)
//         }
//       }

//   const handleNextClient = () => {
//   // It matches either of the following formats 1. +639191234567, or 2. 09191234567
//   const validContactno = /((^(\+)(\d){12}$)|(^\d{11}$))/;
//   const validEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   console.log(infoStateClient.infoObjClient)
//   if(infoStateClient.infoObjClient === undefined){
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCfname = true
//       errorHandlerClient.errorLoggerClname = true
//       errorHandlerClient.errorLoggerCcontact = true
//       errorHandlerClient.errorLoggerCaddress = true
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("Empty field")
//     Toast.fire({
//       icon: 'error',
//       title: 'Empty fields. please try again.'
//     })
//     setClientEmailErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCemail = true
//       return {errorHandlerClient}
//     })
//     setEmailTextClient("Empty field")
//     Toast.fire({
//       icon: 'error',
//       title: 'Empty fields. please try again.'
//     })
//     return false
//   }
//   else if(!infoStateClient.infoObjClient.clientfname || !infoStateClient.infoObjClient.clientlname
//       || !infoStateClient.infoObjClient.clientemail || !infoStateClient.infoObjClient.clientcontact 
//       || !infoStateClient.infoObjClient.clientaddress){
//       Toast.fire({
//         icon: 'error',
//         title: 'Empty fields. please try again.'
//       })
//       return false
//     }
//     else if(!validEmail.test(infoStateClient.infoObjClient.clientemail))
//     {
//       Toast.fire({
//         icon: 'error',
//         title: 'Please provide a valid email address'
//       })
//       return false
//     }
//     else if(!validContactno.test(infoStateClient.infoObjClient.clientcontact))
//     {
//       Toast.fire({
//         icon: 'error',
//         title: 'Invalid Contact Number'
//       })
//       return false
//     }
//   else{
//     setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
//   }
//  }

//   const handleBackClient = () => {
//   setClientActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleClientFnameChange = (e) => {
//     if(e.target.value === null || e.target.value === ''){
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCfname = true
//         return {errorHandlerClient}
//       })
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientfname = ""
//         return {infoObjClient}
//       })
//       setHelperTextClient("Empty field")
//     } else {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientfname = e.target.value
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCfname = false
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("")
//     }
//  }
//   const handleClientLnameChange = (e) => {
//   if(e.target.value === null || e.target.value === '') {
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientlname = ""
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerClname = true
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("Empty field")
//   } else {
//      setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientlname = e.target.value
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerClname = false
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("")
//   }
// }
// const handleEmailChangeClient = (e) => {
//   if(e.target.value === null || e.target.value === ''){
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientemail = ""
//       return {infoObjClient}
//     })
//     setClientEmailErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCemail = true
//       return {errorHandlerClient}
//     })
//     setEmailTextClient("Please provide a valid email address")
//   }else{
//       setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientemail = e.target.value
//       return {infoObjClient}
//     })
//     setClientEmailErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCemail = false
//       return {errorHandlerClient}
//     })
//     setEmailTextClient("")
//   }
// }
// const handleContactChangeClient = (e) => {
//   if(e.target.value === null || e.target.value === ''){
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientcontact = ""
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCcontact = true
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("Empty field")
//   }else{
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientcontact = e.target.value
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCcontact = false
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("")
//   }
// }
// const handleAddressChangeClient = (e) => {
//   if(e.target.value === null || e.target.value === ''){
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientaddress = ""
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCaddress = true
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("Empty field")
//   }else{
//     setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientaddress = e.target.value
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCaddress = false
//       return {errorHandlerClient}
//     })
//     setHelperTextClient("")
//     }
//   }

//   const handleClientUsername = (e) => {
//     if(e.target.value === null || e.target.value === '') {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientusername = ""
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCusername = true
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("Empty field")
//     } else {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientusername = e.target.value
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCusername = false
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("")
//     }
//   }
//   const handleClientPassword = (e) => {
//     if(e.target.value === null || e.target.value === '') {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientpassword = ""
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCpassword = true
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("Empty field")
//     } else {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientpassword = e.target.value
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCpassword = false
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("")
//     }
//   }
//   const handleClientConfirmPassword = (e) => {
//     if(e.target.value === null || e.target.value === '') {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientconpass = ""
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCconpass = true
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("Empty field")
//     } else {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientconpass = e.target.value
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCconpass = false
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("")
//     }
//   }

//   const handleClientSecQuestions = (event) => {
    
//     if(event.target.value === null || event.target.value === '') {
//       setClientSecQuestion("")
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientsecquestion = ""
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCsecquestion = true
//         return {errorHandlerClient}
//       })
//     }else{
//       setClientSecQuestion(event.target.value)
//       setInfoStateClient(prevState => {
//       let infoObjClient = Object.assign({}, prevState.infoObjClient)
//       infoObjClient.clientsecquestion = event.target.value
//       return {infoObjClient}
//     })
//     setClientErrorRequest(prevState => {
//       let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//       errorHandlerClient.errorLoggerCsecquestion = false
//       return {errorHandlerClient}
//     })
//     }
//   }
//   const handleClientSecAnswer = (e) => {
//     if(e.target.value === null || e.target.value === '') {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientsecanswer = ""
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCsecanswer = true
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("Empty field")
//     } else {
//        setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientsecanswer = e.target.value
//         return {infoObjClient}
//       })
//       setClientErrorRequest(prevState => {
//         let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
//         errorHandlerClient.errorLoggerCsecanswer = false
//         return {errorHandlerClient}
//       })
//       setHelperTextClient("")
//     }
//   }

//     // CLIENT REGISTRATION
//     const defaultClientValueSetter = () => {
//       setInfoStateClient(prevState => {
//         let infoObjClient = Object.assign({}, prevState.infoObjClient)
//         infoObjClient.clientfname = undefined
//         infoObjClient.clientlname = undefined
//         infoObjClient.clientaddress = undefined
//         infoObjClient.username = undefined
//         infoObjClient.password = undefined
//         infoObjClient.conpass = undefined
//         infoObjClient.secquestion = undefined
//         infoObjClient.secanswer = undefined
//         return {infoObjClient}
//       })
//     }
//     // CLIENT REGISTRATION //
//     const StepHelperClient = () => {
//       if(clientActiveStep === 0) {
//           return(
//               <React.Fragment>
//              <div style={{marginTop: '20px', marginBottom: '20px'}}>
//              <h4>Modern Resolve Developer Registration</h4>
//                                   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                           Be one of us, join our development community
//                                   </Typography>
//                                   <div style={{marginTop: '30px'}} className="row">
//                                       <div className="col-sm">
//                                       {
//                                            MUIText({
//                                             typography : "Firstname",
//                                             dataOnChange : handleClientFnameChange,
//                                             id: "outlined-basic",
//                                             label: "Your firstname",
//                                             type : "text",
//                                             stylish : {width: '100%'},
//                                             variant : "outlined",
//                                             isError : clientErrorRequest.errorHandlerClient.errorLoggerCfname,
//                                             helperTextHelper : errorHelperTextClient,
//                                             value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientfname
//                                           })
//                                       }
//                                       </div>
//                                       <div className="col-sm">
//                                       {
//                                           MUIText({
//                                             typography : "Lastname",
//                                             dataOnChange : handleClientLnameChange,
//                                             id: "outlined-basic",
//                                             label: "Your lastname",
//                                             type : "text",
//                                             stylish : {width: '100%'},
//                                             variant : "outlined",
//                                             isError : clientErrorRequest.errorHandlerClient.errorLoggerClname,
//                                             helperTextHelper : errorHelperTextClient,
//                                             value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientlname
//                                           })
//                                         }
//                                       </div>
//                                   </div>
//                                   <div className="row" style={{marginTop: '30px'}}>
//                                   <div className="col-sm">
//                                       {
//                                           MUIText({
//                                             typography : "Email Address",
//                                             dataOnChange : handleEmailChangeClient,
//                                             id: "outlined-basic",
//                                             label: "Your Email",
//                                             type : "text",
//                                             stylish : {width: '100%'},
//                                             variant : "outlined",
//                                             isError : clientEmailErrorRequest.errorHandlerClient.errorLoggerCemail,
//                                             helperTextHelper : errorEmailTextClient,
//                                             value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientemail
//                                           })
//                                         }
//                                       </div>
//                                       <div className="col-sm">
//                                       {
//                                           MUIText({
//                                             typography : "Contact Number",
//                                             dataOnChange : handleContactChangeClient,
//                                             id: "outlined-basic",
//                                             label: "Your Contact",
//                                             type : "text",
//                                             stylish : {width: '100%'},
//                                             variant : "outlined",
//                                             isError : clientErrorRequest.errorHandlerClient.errorLoggerCcontact,
//                                             helperTextHelper : errorHelperTextClient,
//                                             value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientcontact
//                                           })
//                                         }
//                                       </div>
//                                   </div>
//                                   <div style={{marginTop: '30px'}}>
//                                   {
//                                           MUIText({
//                                             typography : "Primary Address",
//                                             dataOnChange : handleAddressChangeClient,
//                                             id: "outlined-multiline-flexible",
//                                             label: "Your address",
//                                             type : "text",
//                                             stylish : {width: '100%'},
//                                             isError : clientErrorRequest.errorHandlerClient.errorLoggerCaddress,
//                                             helperTextHelper : errorHelperTextClient,
//                                             value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientaddress
//                                           })
//                                         }
//                                   </div>  
//              </div>
//               <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                 <Button
//                   color="inherit"
//                   disabled={clientActiveStep === 0}
//                   onClick={handleBackClient}
//                   sx={{ mr: 1 }}
//                 >
//                   Back
//                 </Button>
//                 <Box sx={{ flex: '1 1 auto' }} />

//                 <Button onClick={handleNextClient}>
//                   {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
//                 </Button>
//               </Box>
//               </React.Fragment>
//           )
//       }
//       else if(clientActiveStep === 1) {
//         return (
//             <React.Fragment>
//              <div style={{marginTop: '20px', marginBottom: '20px'}}>
//              <h4>Credentials</h4>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                         Credentials Information will provide here.
//                                 </Typography>

//                                 <div style={{marginTop: '30px'}}>
//                                   {
//                                      MUIText({
//                                       typography : "Username",
//                                       dataOnChange : handleClientUsername,
//                                       id: "outlined-basic",
//                                       label: "Your username",
//                                       type : "text",
//                                       stylish : {width: '100%'},
//                                       helperTextHelper : errorHelperTextClient,
//                                       isError : clientErrorRequest.errorHandlerClient.errorLoggerCusername,
//                                       value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientusername
//                                     })
//                                   }
//                                   {
//                                      MUIText({
//                                       typography : "Password",
//                                       dataOnChange : handleClientPassword,
//                                       id: "outlined-basic",
//                                       label: "Your password",
//                                       type : "password",
//                                       stylish : {width: '100%'},
//                                       helperTextHelper : errorHelperTextClient,
//                                       isError : clientErrorRequest.errorHandlerClient.errorLoggerCpassword,
//                                       value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientpassword
//                                     })
//                                   }
//                                   {
//                                      MUIText({
//                                       typography : "Confirm Password",
//                                       dataOnChange : handleClientConfirmPassword,
//                                       id: "outlined-basic",
//                                       label: "Confirm your password",
//                                       type : "password",
//                                       stylish : {width: '100%'},
//                                       helperTextHelper : errorHelperTextClient,
//                                       isError : clientErrorRequest.errorHandlerClient.errorLoggerCconpass,
//                                       value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientconpass
//                                     })
//                                   }
//                                   <div className="row" style={{marginTop: '30px'}}>
//                                     <div className="col-sm">
//                                             {BasicSelect({
//                                               value : clientSecQuestion,
//                                               handleSelect : handleClientSecQuestions,
//                                               selectionArray : secQuestionsArray,
//                                               selectionTitle : 'Security Questions'
//                                             })}
//                                     </div>
//                                     <div className="col-sm">
//                                     {
//                                           MUIText({
//                                             typography : "Security Answer",
//                                             dataOnChange : handleClientSecAnswer,
//                                             id: "outlined-basic",
//                                             label: "Security Answer",
//                                             type : "text",
//                                             stylish : {width: '100%'},
//                                             variant : "outlined",
//                                             isError : clientErrorRequest.errorHandlerClient.errorLoggerCsecanswer,
//                                             helperTextHelper : errorHelperTextClient,
//                                             value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientsecanswer
//                                           })
//                                         }
//                                     </div>
//                                   </div>
//                                   <Backdrop
//                                   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                                   open={isLoading}
//                                   onClick={handleCloseBackDrop}
//                                 >
//                                   <CircularProgress color="inherit" />
//                                 </Backdrop>
//                                 </div>
//              </div>
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={clientActiveStep === 0}
//                 onClick={handleBackClient}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: '1 1 auto' }} />

//               <Button onClick={handleNextCredentialsClient}>
//                 {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
//               </Button>
//             </Box>
//             </React.Fragment>
//         )
//     }  
//   }

//     return (
//         <div>
//             <Navbar />
//             <div style={{marginTop: '150px'}} className="container">
//             <Card sx={{ minWidth: 275 }} style={{marginBottom: '30px'}}>
//                         <CardContent>
//                             <Box sx={{ width: '100%' }}>
//                                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                                     <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
//                                     <Tab wrapped label="Client Registration" {...a11yProps(0)} />
//                                     </Tabs>
//                                 </Box>
//                                 <TabPanel value={value} index={0}>
//                                   <Stepper activeStep={clientActiveStep}>
//                                           {clientSteps.map((label, index) => {
//                                           const stepProps = {};
//                                           const labelProps = {};

//                                           return (
//                                               <Step key={label} {...stepProps}>
//                                               <StepLabel {...labelProps}>{label}</StepLabel>
//                                               </Step>
//                                           );
//                                           })}
//                                       </Stepper>
//                                 {StepHelperClient()}
//                                 </TabPanel>
//                                 </Box>
//                         </CardContent>
//                     </Card>
//             </div>
//         </div>
//     )
// }

// export default ClientRegistration;