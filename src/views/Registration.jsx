import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import BasicSelect from '../components/Select/Select'
import MUIText from '../components/TextField/TextField'
import MUIButton from '../components/Button/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Slider from '@mui/material/Slider';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import store from '../redux/store'
import visa from '../assets/creditcard.png';
import gcash from '../assets/gcash.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import { styled as styler } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import {checkUser, createUser} from '../redux/core/registration'
import {checkUser, pushCreateDev, checkClient, pushCreateClient} from '../redux/core/registrationSlice'
import { SignalCellularNull } from '@mui/icons-material';
import { indigo } from '@mui/material/colors';
import TermsAConditions from '../components/TermsAndConditions/TermsAConditions';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
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
// DEV REGISTRATION //
const steps = ['Personal Information', 'Credentials Information', 'Finish'];
const infoObj = {
  fname : "", lname : "",
   occupationStatus: '',
    occupationDetails : "", occupationPositionWork : '',
     nameOfSchool : '', degree : '', address : '',
      username : '', password : '', conpass : '', userTrigger : true
}
const occupationArray = [
  {
    label : 'Working', value : 'working'
  },
  {
    label : 'Studying', value: 'studying'
  }
]
const studyStatus = [
  {
    label : 'College Degree', value : 'college'
  }, {
    label : 'Senior High School', value : 'shs'
  }
]

const AppRegistration = () => {
  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        window.removeEventListener('beforeunload', alertUser)
        window.removeEventListener('unload', handleTabClosing)
    }
})
    const handleTabClosing = () => {
      window.close()
    }

    const alertUser = (event) => {
    if(infoStateClient.infoObjClient.clientfname !== undefined || infoStateClient.infoObjClient.clientlname !== undefined 
        || infoStateClient.infoObjClient.clientemail !== undefined || infoStateClient.infoObjClient.clientcontact !== undefined 
        || infoStateClient.infoObjClient.clientaddress !== undefined || infoState.infoObj.fname !== undefined || infoState.infoObj.lname !== undefined 
        || infoState.infoObj.occupationStatus !== undefined || infoState.infoObj.occupationDetails !== undefined 
        || infoState.infoObj.occupationPositionWork !== undefined || infoState.infoObj.nameOfSchool !== undefined
        || infoState.infoObj.degree !== undefined || infoState.infoObj.address !== undefined || infoStateClient.infoObjClient.clientsystemtype !== undefined
        || infoStateClient.infoObjClient.clientrequestorstatus !== undefined || infoStateClient.infoObjClient.clientprojectscale !== undefined
        || infoStateClient.infoObjClient.clientbudgetrange !== undefined || infoStateClient.infoObjClient.clientremarks !== undefined){
          event.preventDefault()
          event.returnValue = ''
      }
    }

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

  // DEV REGISTRATION //
    const [
      userValue,
      registrationSuccessMessage,
      registrationBoolean
     ] = useSelector((state) => [
      state.user.userValue,
      state.user.registrationSuccessMessage,
      state.user.registrationBoolean
    ])
    const ref = React.useRef(userValue)
    const refregisterSuccess = React.useRef(registrationSuccessMessage)
    const checkUserRef = React.useRef(registrationBoolean)
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [infoState, setInfoState] = React.useState(infoObj)
    const [occupation, setOccupation] = React.useState('');
    const [study, setStudy] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const [errorRequest, setErrorRequest] = React.useState({
      errorHandler : {
        errorLoggerFname : false,
        errorLoggerLname : false,
        errorLoggerNameOfCompany: false,
        errorLoggerPositionWork : false,
        errorLoggerSchoolName : false,
        errorLoggerAddress : false,
        errorLoggerIsStudy : false,
        errorLoggerOccupation : false,
        errorLoggerUsername : false,
        errorLoggerPassword : false,
        errorLoggerConfirmPassword : false
      }
    })
    const dispatch = useDispatch();
    
    
    const [errorHelperText, setHelperText] = React.useState('')

    const handleOccupation = (event) => {
      if(event.target.value === null || event.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.occupationStatus = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerOccupation = true
          return {errorHandler}
        })
      }else{
        setOccupation(event.target.value)
        setInfoState(prevState => {
        let infoObj = Object.assign({}, prevState.infoObj)
        infoObj.occupationStatus = event.target.value
        infoObj.nameOfSchool = ""
        infoObj.occupationDetails = ""
        infoObj.occupationPositionWork = ""
        return {infoObj}
      })
      setErrorRequest(prevState => {
        let errorHandler = Object.assign({}, prevState.errorHandler)
        errorHandler.errorLoggerOccupation = false
        return {errorHandler}
      })
      }
      
    }
    const handleStudy = (event) => {
      if(event.target.value === null || event.target.value === ''){
        setStudy("")
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.degree = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerIsStudy = true
          return {errorHandler}
        })
      }else{
        setStudy(event.target.value)
      setInfoState(prevState => {
        let infoObj = Object.assign({}, prevState.infoObj)
        infoObj.degree = event.target.value
        return {infoObj}
      })
      setErrorRequest(prevState => {
        let errorHandler = Object.assign({}, prevState.errorHandler)
        errorHandler.errorLoggerIsStudy = false
        return {errorHandler}
      })
      }
    }
    const handleChange = (event, newValue) => { 
        if(infoStateClient.infoObjClient.clientfname !== undefined || infoStateClient.infoObjClient.clientlname !== undefined 
          || infoStateClient.infoObjClient.clientemail !== undefined || infoStateClient.infoObjClient.clientcontact !== undefined 
          || infoStateClient.infoObjClient.clientaddress !== undefined || infoState.infoObj.fname !== undefined || infoState.infoObj.lname !== undefined 
          || infoState.infoObj.occupationStatus !== undefined || infoState.infoObj.occupationDetails !== undefined 
          || infoState.infoObj.occupationPositionWork !== undefined || infoState.infoObj.nameOfSchool !== undefined
          || infoState.infoObj.degree !== undefined || infoState.infoObj.address !== undefined || infoStateClient.infoObjClient.clientsystemtype !== undefined
          || infoStateClient.infoObjClient.clientrequestorstatus !== undefined || infoStateClient.infoObjClient.clientprojectscale !== undefined
          || infoStateClient.infoObjClient.clientbudgetrange !== undefined || infoStateClient.infoObjClient.clientremarks !== undefined){
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Change Registration!'
            }).then((result) => {
              if (result.isConfirmed) {
                setInfoStateClient(prevState => {
                  let infoObjClient = Object.assign({}, prevState.infoObjClient)
                  infoObjClient.clientfname = undefined
                  infoObjClient.clientlname = undefined
                  infoObjClient.clientemail = undefined
                  infoObjClient.clientcontact = undefined
                  infoObjClient.clientaddress = undefined
                  infoObjClient.clientusername = undefined
                  infoObjClient.clientpassword = undefined
                  infoObjClient.clientconpass = undefined
                  infoObjClient.clientsecquestion = undefined
                  infoObjClient.clientsecanswer = undefined
                  setClientSecQuestion(clientSecQuestion => clientSecQuestion = "")
                  setHelperTextClient("")
                  setClientErrorRequest(prevState => {
                    let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
                    errorHandlerClient.errorLoggerCfname = false
                    errorHandlerClient.errorLoggerClname = false
                    errorHandlerClient.errorLoggerCemail = false
                    errorHandlerClient.errorLoggerCcontact = false
                    errorHandlerClient.errorLoggerCaddress = false
                    errorHandlerClient.errorLoggerCusername = false
                    errorHandlerClient.errorLoggerCpassword = false
                    errorHandlerClient.errorLoggerCconpass = false
                    errorHandlerClient.errorLoggerCsecquestion = false
                    errorHandlerClient.errorLoggerCsecanswer = false
                    return {errorHandlerClient}
                  })
                  return {infoObjClient}
                })
                  setInfoStateClient(prevState => {
                  let infoObjClient = Object.assign({}, prevState.infoObjClient)
                  infoObjClient.clientsystemtype = undefined
                  infoObjClient.clientrequestorstatus = undefined
                  infoObjClient.clientprojectscale = undefined
                  infoObjClient.clientbudgetrange = undefined
                  infoObjClient.clientremarks = undefined
                  setSystemType(systemType => systemType = "")
                  setRequestorType(requestorType => requestorType = "")
                  setProjectScale(projectScale => projectScale = "")
                  setTermsandConditions(false);
                  setClientErrorRequest(prevState => {
                    let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
                    errorHandlerClient.errorLoggerCsystemtype = false
                    errorHandlerClient.errorLoggerCrequestor = false
                    errorHandlerClient.errorLoggerCprojectscale = false
                    errorHandlerClient.errorLoggerCbudgetrange = false
                    errorHandlerClient.errorLoggerCremarks = false
                    return {errorHandlerClient}
                    })
                    return {infoObjClient}
                  })
                  setInfoState(prevState => {
                    let infoObj = Object.assign({}, prevState.infoObj)
                    infoObj.fname = undefined
                    infoObj.lname = undefined
                    infoObj.occupationStatus = undefined
                    infoObj.occupationDetails = undefined
                    infoObj.occupationPositionWork = undefined
                    infoObj.nameOfSchool = undefined
                    infoObj.degree = undefined
                    infoObj.address = undefined
                    infoObj.username = undefined
                    infoObj.password = undefined
                    infoObj.conpass = undefined
                  setOccupation(Occupation => Occupation = "")
                  setStudy(study => study = "")
                  setErrorRequest(prevState => {
                    let errorHandler = Object.assign({}, prevState.errorHandler)
                    errorHandler.errorLoggerFname = false
                    errorHandler.errorLoggerLname = false
                    errorHandler.errorLoggerNameOfCompany= false
                    errorHandler.errorLoggerPositionWork = false
                    errorHandler.errorLoggerSchoolName = false
                    errorHandler.errorLoggerAddress = false
                    errorHandler.errorLoggerIsStudy = false
                    errorHandler.errorLoggerOccupation = false
                    errorHandler.errorLoggerUsername = false
                    errorHandler.errorLoggerPassword = false
                    errorHandler.errorLoggerConfirmPassword = false
                    return {errorHandler}
                  })
                  setHelperText("")
                  return {infoObj}
                })	
                setClientActiveStep(clientActiveStep => clientActiveStep = 0)
                setActiveStep(clientStep => clientStep = 0)
                setValue(newValue);
              }
            })
          return false;
        }
        else {
          setValue(newValue);
        }
        // setValue(newValue);
    };
    const handleCloseBackDrop = () => {
      setLoading(false)
    }
    React.useEffect(() => {
      setInfoState(prevState => {
        let infoObj = Object.assign({}, prevState.infoObj)
        infoObj.userTrigger = true
        return {infoObj}
      })
    }, [])
    React.useEffect(() => {
      ref.current = userValue
      refregisterSuccess.current = registrationSuccessMessage
      checkUserRef.current = registrationBoolean
    }, [userValue,
       registrationSuccessMessage,
        registrationBoolean])
    const handleNextCredentials = () => {
      if(!infoState.infoObj.password || !infoState.infoObj.conpass || !infoState.infoObj.username) {
        Toast.fire({
          icon: 'error',
          title: 'Empty fields. please try again.'
        })
        return false
      } else if(infoState.infoObj.conpass !== infoState.infoObj.password) {
        Toast.fire({
          icon: 'error',
          title: 'Password mismatch'
        })
        return false
      } else {
        setLoading(true)
        dispatch(checkUser(infoState.infoObj))
        setTimeout(() => {
          if(ref.current[0].key === 'username_available'){
            console.log(ref.current)
             dispatch(pushCreateDev(infoState.infoObj))
          } else {
            console.log(ref.current)
            Toast.fire({
              icon: 'error',
              title: 'Username already taken.'
            })
            setLoading(false)
            return false
          }
        }, 2000)
        setTimeout(() => {
          if(refregisterSuccess.current[0].key === "dev_registration_success") {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'You have successfully created an account.'
            })
            setInfoState(prevState => {
              let infoObj = Object.assign({}, prevState.infoObj)
              infoObj.fname = undefined
              infoObj.lname = undefined
              infoObj.occupationStatus = undefined
              infoObj.occupationDetails = undefined
              infoObj.occupationPositionWork = undefined
              infoObj.nameOfSchool = undefined
              infoObj.degree = undefined
              infoObj.address = undefined
              infoObj.username = undefined
              infoObj.password = undefined
              infoObj.conpass = undefined
              setOccupation(Occupation => Occupation = "")
              setStudy(study => study = "")
              return {infoObj}
            })
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } 
        }, 3000)
      }
    }
    const handleNext = () => {
        console.log(infoState.infoObj)
        if(infoState.infoObj === undefined){
          setErrorRequest(prevState => {
            let errorHandler = Object.assign({}, prevState.errorHandler)
            errorHandler.errorLoggerFname = true
            errorHandler.errorLoggerLname = true
            errorHandler.errorLoggerNameOfCompany= true
            errorHandler.errorLoggerPositionWork = true
            errorHandler.errorLoggerSchoolName = true
            errorHandler.errorLoggerAddress = true
            errorHandler.errorLoggerIsStudy = true
            errorHandler.errorLoggerOccupation = true
            return {errorHandler}
          })
          setHelperText("Empty field")
          Toast.fire({
            icon: 'error',
            title: 'Empty fields. please try again.'
          })
          return false
        }
        else{ 
          if(occupation === 'working') {
            if(!infoState.infoObj.fname || !infoState.infoObj.lname
              || !infoState.infoObj.occupationStatus || !infoState.infoObj.occupationDetails
              || !infoState.infoObj.occupationPositionWork || !infoState.infoObj.address){
                Toast.fire({
                  icon: 'error',
                  title: 'Empty fields. please try again.'
                })
                return false
              }
              else{
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              }
          } else if (occupation === 'studying'){
            if(!infoState.infoObj.fname || !infoState.infoObj.lname
              || !infoState.infoObj.occupationStatus || !infoState.infoObj.nameOfSchool 
              || !infoState.infoObj.degree || !infoState.infoObj.address){
              Toast.fire({
                icon: 'error',
                title: 'Empty fields. please try again.'
              })
              return false
            }else {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
          }
        }
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleFnameChange = (e) => {
        if(e.target.value === null || e.target.value === ''){
          setErrorRequest(prevState => {
            let errorHandler = Object.assign({}, prevState.errorHandler)
            errorHandler.errorLoggerFname = true
            return {errorHandler}
          })
          setInfoState(prevState => {
            let infoObj = Object.assign({}, prevState.infoObj)
            infoObj.fname = ""
            return {infoObj}
          })
          setHelperText("Empty field")
        } else {
          setInfoState(prevState => {
            let infoObj = Object.assign({}, prevState.infoObj)
            infoObj.fname = e.target.value
            return {infoObj}
          })
          setErrorRequest(prevState => {
            let errorHandler = Object.assign({}, prevState.errorHandler)
            errorHandler.errorLoggerFname = false
            return {errorHandler}
          })
          setHelperText("")
        }
    }
    const handleLnameChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.lname = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerLname = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      } else {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.lname = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerLname = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleOccupationSelectChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.occupationDetails = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerNameOfCompany = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      }
      else{
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.occupationDetails = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerNameOfCompany = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleWorkPositionChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.occupationPositionWork = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerPositionWork = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      }
      else{
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.occupationPositionWork = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerPositionWork = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleSchoolNameChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.nameOfSchool = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerSchoolName = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      }
     else{
      setInfoState(prevState => {
        let infoObj = Object.assign({}, prevState.infoObj)
        infoObj.nameOfSchool = e.target.value
        return {infoObj}
      })
      setErrorRequest(prevState => {
        let errorHandler = Object.assign({}, prevState.errorHandler)
        errorHandler.errorLoggerSchoolName = false
        return {errorHandler}
      })
      setHelperText("")
     }
    }
    const handleAddressChange = (e) => {
      if(e.target.value === null || e.target.value === ''){
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.address = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerAddress = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      }else{
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.address = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerAddress = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleUsernameChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.username = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerUsername = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      } else {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.username = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerUsername = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handlePasswordChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.password = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerPassword = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      } else {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.password = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerPassword = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const handleConfirmPasswordChange = (e) => {
      if(e.target.value === null || e.target.value === '') {
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.conpass = ""
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerConfirmPassword = true
          return {errorHandler}
        })
        setHelperText("Empty field")
      }else{
        setInfoState(prevState => {
          let infoObj = Object.assign({}, prevState.infoObj)
          infoObj.conpass = e.target.value
          return {infoObj}
        })
        setErrorRequest(prevState => {
          let errorHandler = Object.assign({}, prevState.errorHandler)
          errorHandler.errorLoggerConfirmPassword = false
          return {errorHandler}
        })
        setHelperText("")
      }
    }
    const OccupationHelper = () => {
      if(occupation === 'working') {
        return (
          <div>
            {
              MUIText({
                typography : "Name of company",
                dataOnChange : handleOccupationSelectChange,
                id: "outlined-basic",
                label: "Your company name",
                type : "text",
                stylish : {width: '100%'},
                variant : "outlined",
                helperTextHelper : errorHelperText,
                isError : errorRequest.errorHandler.errorLoggerNameOfCompany,
                value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.occupationDetails
              })
            }
          </div>
        )
      } else if(occupation === 'studying') {
        return (
          <div>
             {
              MUIText({
                typography : "Name of school",
                dataOnChange : handleSchoolNameChange,
                id: "outlined-basic school",
                label: "Your school name",
                type : "text",
                stylish : {width: '100%'},
                variant : "outlined",
                helperTextHelper : errorHelperText,
                isError : errorRequest.errorHandler.errorLoggerSchoolName,
                value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.nameOfSchool
              })
            }
          </div>
        )
      }
    }
    const OccupationPositionWrk = () => {
      if(occupation === 'working') {
        return(
          <div>
             {
              MUIText({
                typography : "Work Position",
                dataOnChange : handleWorkPositionChange,
                id: "outlined-basic",
                label: "Your work position",
                type : "text",
                stylish : {width: '100%'},
                variant : "outlined",
                helperTextHelper : errorHelperText,
                isError : errorRequest.errorHandler.errorLoggerPositionWork,
                value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.occupationPositionWork
              })
            }
            
          </div>
        )
      } else if(occupation === 'studying') {
        return(
          <>
            {BasicSelect({

                                              value : study,
                                              handleSelect : handleStudy,
                                              selectionArray : studyStatus,
                                              selectionTitle : 'Degree',
                                              isError : errorRequest.errorHandler.errorLoggerIsStudy

                                            })}
          </>
        )
      }
    }
    // DEV REGISTRATION //
    const defaultValueSetter = () => {
      setInfoState(prevState => {
        let infoObj = Object.assign({}, prevState.infoObj)
        infoObj.fname = undefined
        infoObj.lname = undefined
        infoObj.occupationDetails = undefined
        infoObj.occupationPositionWork = undefined
        infoObj.nameOfSchool = undefined
        infoObj.degree = undefined
        infoObj.address = undefined
        infoObj.username = undefined
        infoObj.password = undefined
        infoObj.conpass = undefined
        return {infoObj}
      })
    }
    
    // DEV REGISTRATION //
    const StepHelper = () => {
        if(activeStep === 0) {
            return(
                <React.Fragment>
               <div style={{marginTop: '20px', marginBottom: '20px'}}>
               <h4>Modern Resolve Developer Registration</h4>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Be one of us, join our development community
                                    </Typography>
                                    <div style={{marginTop: '30px'}} className="row">
                                        <div className="col-sm">
                                        {
                                             MUIText({
                                              typography : "Firstname",
                                              dataOnChange : handleFnameChange,
                                              id: "outlined-basic",
                                              label: "Your firstname",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerFname,
                                              helperTextHelper : errorHelperText,
                                              value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.fname
                                            })
                                        }
                                        </div>
                                        <div className="col-sm">
                                        {
                                            MUIText({
                                              typography : "Lastname",
                                              dataOnChange : handleLnameChange,
                                              id: "outlined-basic",
                                              label: "Your lastname",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              variant : "outlined",
                                              isError : errorRequest.errorHandler.errorLoggerLname,
                                              helperTextHelper : errorHelperText,
                                              value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.lname
                                            })
                                          }
                                        </div>
                                    </div>
                                    <div className="row" style={{marginTop: '30px'}}>
                                        <div className="col-sm">
                                            {BasicSelect({

                                              value : occupation,
                                              handleSelect : handleOccupation,
                                              selectionArray : occupationArray,
                                              selectionLabel : 'Occupation',
                                              selectionTitle: 'Occupation Status'

                                            })}
                                        </div>
                                        <div className="col-sm">
                                           {
                                             OccupationHelper()
                                           }
                                        </div>
                                        <div className="col-sm">
                                          {
                                            OccupationPositionWrk()
                                          }
                                        </div>
                                    </div>
                                    <div style={{marginTop: '30px'}}>
                                    {
                                            MUIText({
                                              typography : "Primary Address",
                                              dataOnChange : handleAddressChange,
                                              id: "outlined-multiline-flexible",
                                              label: "Your address",
                                              type : "text",
                                              stylish : {width: '100%'},
                                              helperTextHelper : errorHelperText,
                                              isError : errorRequest.errorHandler.errorLoggerAddress,
                                              value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.address
                                            })
                                          }
                                    </div>  
               </div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
                </React.Fragment>
            )
        } else if(activeStep === 1) {
            return (
                <React.Fragment>
                 <div style={{marginTop: '20px', marginBottom: '20px'}}>
                 <h4>Credentials</h4>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Credentials Information will provide here.
                                    </Typography>

                                    <div style={{marginTop: '30px'}}>
                                      {
                                         MUIText({
                                          typography : "Username",
                                          dataOnChange : handleUsernameChange,
                                          id: "outlined-basic",
                                          label: "Your username",
                                          type : "text",
                                          stylish : {width: '100%'},
                                          helperTextHelper : errorHelperText,
                                          isError : errorRequest.errorHandler.errorLoggerUsername,
                                          value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.username
                                        })
                                      }
                                      {
                                         MUIText({
                                          typography : "Password",
                                          dataOnChange : handlePasswordChange,
                                          id: "outlined-basic",
                                          label: "Your password",
                                          type : "password",
                                          stylish : {width: '100%'},
                                          helperTextHelper : errorHelperText,
                                          isError : errorRequest.errorHandler.errorLoggerPassword,
                                          value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.password
                                        })
                                      }
                                      {
                                         MUIText({
                                          typography : "Confirm Password",
                                          dataOnChange : handleConfirmPasswordChange,
                                          id: "outlined-basic",
                                          label: "Confirm your password",
                                          type : "password",
                                          stylish : {width: '100%'},
                                          helperTextHelper : errorHelperText,
                                          isError : errorRequest.errorHandler.errorLoggerConfirmPassword,
                                          value : (infoState.infoObj === undefined) ? defaultValueSetter : infoState.infoObj.conpass
                                        })
                                      }
                                      <Backdrop
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      open={isLoading}
                                      onClick={handleCloseBackDrop}
                                    >
                                      <CircularProgress color="inherit" />
                                    </Backdrop>
                                    </div>
                 </div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                  <Button onClick={handleNextCredentials}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
                </React.Fragment>
            )
        } else if(activeStep === 2) {
          return(
            <React.Fragment>
               <div style={{marginTop: '20px', marginBottom: '20px'}}>
               <h4>You're all caught up !</h4>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Kindly wait for your account or contact the system admin for account activation.
                                    </Typography>
               </div>
               <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                  <Button onClick={handleNextCredentials}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
            </React.Fragment>
          )
        }
    }

// CLIENT REGISTRATION //
const clientSteps = ['Primary Information','Request Client Proposal','Payment Method','Credentials','Finish'];
const infoObjClient = { 
  clientfname: "", clientlname: "", clientemail: "",
  clientcontact: "", clientaddress: "", clientusername: "",
  clientpassword: "", clientconpass: "", clientsecquestion: "", clientsecanswer: '', clientsystemtype: "", 
  clientrequestorstatus: "", clientprojectscale: "", clientbudgetrange: "", clientremarks: "", clientpayment: "",
   clientTrigger : true
}

const systemTypesArray = [
  {
    label : 'Sales and Inventory System', value: 'Sales and Inventory System'
  },
  {
    label : 'Payroll System', value: 'Payroll System'
  },
  {
    label : 'Product Landing Page Website', value: 'Product Landing Page Website'
  },
  {
    label : 'Warehousing and Monitoring System', value: 'Warehousing and Monitoring System'
  },
  {
    label : 'Hotel & Resort Reservation System', value: 'Hotel & Resort Reservation System'
  },

]

const requestorStatusArray = [
  {
    label : 'Business Owner', value: 'business_owner'
  },
  {
    label : 'Student', value: 'student'
  }

]

const projectScaleArray = [
  {
    label : 'Small Scale', value: 'small_scale'
  },
  {
    label : 'Medium Scale', value: 'medium_scale'
  },
  {
    label : 'Large Scale', value: 'large_scale'
  }

]
const studentBudgetSmall = [
  {value: 10, label: '10k',},
  {value: 12, label: '12k',},
  {value: 15,label: '15k'},
  {value: 18,label: '18k'},
  {value: 20,label: '20k'}
];
const studentBudgetMedium = [
  {value: 25,label: '25k'},
  {value: 30,label: '30k'},
  {value: 35,label: '35k'},
  {value: 40,label: '40k'},
  {value: 45,label: '45k'},
  {value: 50,label: '50k'}
];
const studentBudgetLarge = [
  {value: 60,label: '60k'},
  {value: 65,label: '65k'},
  {value: 70,label: '70k'},
  {value: 75,label: '75k'},
  {value: 80,label: '80k'},
  {value: 85,label: '85k'},
  {value: 90,label: '90k'},
  {value: 95,label: '95k'},
  {value: 100,label: '100k'},
];

function valuetextST(budgetRangeStudent) {
  return `₱${budgetRangeStudent},000`;
}
const BOBudgetSmall = [
  {value: 30,label: '30k'},
  {value: 35,label: '35k'},
  {value: 40,label: '40k'},
  {value: 45,label: '45k'},
  {value: 50,label: '50k'},
  {value: 55,label: '55k'},
  {value: 60,label: '60k'},
  {value: 65,label: '65k'},
];
const BOBudgetMedium = [
  {value: 70,label: '70k'},
  {value: 75,label: '75k'},
  {value: 80,label: '80k'},
  {value: 85,label: '85k'},
  {value: 90,label: '90k'},
  {value: 95,label: '95k'},
  {value: 100,label: '100k'},
];
const BOBudgetLarge = [
  {value: 120,label: '120k'},
  {value: 150,label: '150k'},
  {value: 170,label: '170k'},
  {value: 200,label: '200k'},
  {value: 225,label: '225k'},
  {value: 250,label: '250k'},
  {value: 280,label: '280k'},
  {value: 300,label: '300k'},
];
function valuetextBO(budgetRangeBO) {
  return `₱${budgetRangeBO},000`;
}
const secQuestionsArray = [
  {
    label : 'What is your first job position?', value : 'What is your first job position?'
  },
  {
    label : 'What is your favorite food?', value: 'What is your favorite food?'
  }
]

const [budgetRangeStudent, setBRStudent] = React.useState(15);
const [budgetRangeBO, setBRBO] = React.useState(30);

  const handleBudgetRangeST = (event, newValue) => {
    if (typeof newValue === 'number') {
      setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientbudgetrange = event.target.value + ",000"
      return {infoObjClient}
      })
      setBRStudent(newValue);
    }
  };

  const handleBudgetRangeBO = (event, newValue) => {
    if (typeof newValue === 'number') {
      setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientbudgetrange = event.target.value + ",000"
      return {infoObjClient}
      })
      setBRBO(newValue);
    }
  };
  const BudgetHelper = () => {
    if(requestorType === 'student' && projectScale === 'small_scale') {
      return (
        <div>
          <Box sx={{ width: 300 }}>
           <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
           <Tooltip title="System Development depends on Project Scale and Budget Range" placement="top">
           <InfoOutlinedIcon style={{fontSize: '100%'}}/>
          </Tooltip>
          {budgetRangeStudent === 0 ? '  Select Budget Range' : `  Budget Range :  ${valuetextST(budgetRangeStudent)}` } 
           </Typography>
           <Slider
          aria-label="Always visible"
          defaultValue={budgetRangeStudent}
          getAriaValueText={valuetextST}
          step={null}
          min={10}
          max={20}
          onChange={handleBudgetRangeST}
          marks={studentBudgetSmall}
          valueLabelDisplay="auto"
        />
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
           {budgetRangeStudent === 0 ? 'minimum: ₱10,000' : <></>}
           </Typography>
         </Box>
        </div>
      )
    } else if(requestorType === 'student' && projectScale === 'medium_scale') {
      return (
        <div>
          <Box sx={{ width: 300 }}>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
           <Tooltip title="System Development depends on Project Scale and Budget Range" placement="top">
           <InfoOutlinedIcon style={{fontSize: '100%'}}/>
          </Tooltip>
          {budgetRangeStudent === 0 ? '  Select Budget Range' : `  Budget Range :  ${valuetextST(budgetRangeStudent)}` } 
           </Typography>
           <Slider
          aria-label="Always visible"
          defaultValue={budgetRangeStudent}
          getAriaValueText={valuetextST}
          step={null}
          min={25}
          max={50}
          onChange={handleBudgetRangeST}
          marks={studentBudgetMedium}
          valueLabelDisplay="auto"
        />
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
           {budgetRangeStudent === 0 ? 'minimum: ₱25,000' : <></>}
           </Typography>
         </Box>
        </div>
      )
    } else if(requestorType === 'student' && projectScale === 'large_scale') {
      return (
        <div>
          <Box sx={{ width: 300 }}>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
           <Tooltip title="System Development depends on Project Scale and Budget Range" placement="top">
           <InfoOutlinedIcon style={{fontSize: '100%'}}/>
          </Tooltip>
          {budgetRangeStudent === 0 ? '  Select Budget Range' : `  Budget Range :  ${valuetextST(budgetRangeStudent)}` } 
           </Typography>
           <Slider
          aria-label="Always visible"
          defaultValue={budgetRangeStudent}
          getAriaValueText={valuetextST}
          step={null}
          min={60}
          max={100}
          onChange={handleBudgetRangeST}
          marks={studentBudgetLarge}
          valueLabelDisplay="auto"
        />
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
           {budgetRangeStudent === 0 ? 'minimum: ₱60,000' : <></>}
           </Typography>
         </Box>
        </div>
      )
    } else if(requestorType === 'business_owner' && projectScale === 'small_scale') {
      return (
        <div>
          <Box sx={{ width: 300 }}>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
           <Tooltip title="System Development depends on Project Scale and Budget Range" placement="top">
           <InfoOutlinedIcon style={{fontSize: '100%'}}/>
          </Tooltip>
          {budgetRangeBO === 0 ? '  Select Budget Range' : `  Budget Range :  ${valuetextBO(budgetRangeBO)}` } 
           </Typography>
           <Slider
          aria-label="Always visible"
          defaultValue={30}
          getAriaValueText={valuetextBO}
          min={30}
          max={65}
          step={null}
          onChange={handleBudgetRangeBO}
          marks={BOBudgetSmall}
          valueLabelDisplay="auto"
        />
         <Typography sx={{ fontSize: 16 }} color="text.secondary">
           {budgetRangeBO === 0 ? 'minimum: ₱30,000' : <></>}
           </Typography>
         </Box>
        </div>
      )
    } else if(requestorType === 'business_owner' && projectScale === 'medium_scale') {
      return (
        <div>
          <Box sx={{ width: 300 }}>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
           <Tooltip title="System Development depends on Project Scale and Budget Range" placement="top">
           <InfoOutlinedIcon style={{fontSize: '100%'}}/>
          </Tooltip>
          {budgetRangeBO === 0 ? '  Select Budget Range' : `  Budget Range :  ${valuetextBO(budgetRangeBO)}` } 
           </Typography>
           <Slider
          aria-label="Always visible"
          defaultValue={70}
          getAriaValueText={valuetextBO}
          min={70}
          max={100}
          step={null}
          onChange={handleBudgetRangeBO}
          marks={BOBudgetMedium}
          valueLabelDisplay="auto"
        />
         <Typography sx={{ fontSize: 16 }} color="text.secondary">
           {budgetRangeBO === 0 ? 'minimum: ₱70,000' : <></>}
           </Typography>
         </Box>
        </div>
      )
    } else if(requestorType === 'business_owner' && projectScale === 'large_scale') {
      return (
        <div>
          <Box sx={{ width: 300 }}>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
           <Tooltip title="System Development depends on Project Scale and Budget Range" placement="top">
           <InfoOutlinedIcon style={{fontSize: '100%'}}/>
          </Tooltip>
          {budgetRangeBO === 0 ? '  Select Budget Range' : `  Budget Range :  ${valuetextBO(budgetRangeBO)}` } 
           </Typography>
           <Slider
          aria-label="Always visible"
          defaultValue={120}
          getAriaValueText={valuetextBO}
          min={120}
          max={300}
          step={null}
          onChange={handleBudgetRangeBO}
          marks={BOBudgetLarge}
          valueLabelDisplay="auto"
        />
           <Typography sx={{ fontSize: 16 }} color="text.secondary">
           {budgetRangeBO === 0 ? 'minimum: ₱120,000' : <></>}
           </Typography>
         </Box>
        </div>
      )
    }
  }
  //CLIENT REGISTRATION //
  const [
    clientUserValue,
    registrationSuccessMessageClient,
    registrationBooleanClient
   ] = useSelector((state) => [
    state.user.clientUserValue,
    state.user.registrationSuccessMessageClient,
    state.user.registrationBooleanClient
  ])
  const clientref = React.useRef(clientUserValue)
  const refregisterSuccessClient = React.useRef(registrationSuccessMessageClient)
  const checkClientRef = React.useRef(registrationBooleanClient)
  const [clientActiveStep, setClientActiveStep] = React.useState(0);
  const [infoStateClient,setInfoStateClient] = React.useState(infoObjClient);
  const [clientSecQuestion,setClientSecQuestion] = React.useState('');
  const [systemType, setSystemType] = React.useState('');
  const [requestorType, setRequestorType] = React.useState('');
  const [projectScale, setProjectScale] = React.useState('');
  const [payment, setPayment] = React.useState('');
  const [modal, setModalOpen] = React.useState(false);
  const [openModal, setIsOpen] = React.useState(false);
  const [termsandconditions, setTermsandConditions] = React.useState(false);
  const [clientErrorRequest, setClientErrorRequest] = React.useState({
    errorHandlerClient : {
      errorLoggerCfname : false,
      errorLoggerClname : false,
      errorLoggerCemail : false,
      errorLoggerCcontact : false,
      errorLoggerCaddress : false,
      errorLoggerCsystemtype: false,
      errorLoggerCrequestor: false,
      errorLoggerCprojectscale: false,
      errorLoggerCbudgetrange: false,
      errorLoggerCremarks: false,
      errorLoggerCusername : false,
      errorLoggerCpassword : false,
      errorLoggerCconpass : false,
      errorLoggerCsecquestion: false,
      errorLoggerCsecanswer: false
    }
  })
  const [clientEmailErrorRequest, setClientEmailErrorRequest] = React.useState({
    errorHandlerClient : {
      errorLoggerCemail : false
    }
  })

  const [errorHelperTextClient, setHelperTextClient] = React.useState('');
  const [errorEmailTextClient, setEmailTextClient] = React.useState('');

  React.useEffect(() => {
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientTrigger = true
      return {infoObjClient}
    })
  }, [])

  React.useEffect(() => {
    clientref.current = clientUserValue
    refregisterSuccessClient.current = registrationSuccessMessageClient
    checkClientRef.current = registrationBooleanClient
  }, [clientUserValue,
     registrationSuccessMessageClient,
      registrationBooleanClient])

    const handleSystemType = (event) => {
        if(event.target.value === null || event.target.value === '') {
          setInfoStateClient(prevState => {
            let infoObjClient = Object.assign({}, prevState.infoObjClient)
            infoObjClient.clientsystemtype = ""
            return {infoObjClient}
          })
          setClientErrorRequest(prevState => {
            let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
            errorHandlerClient.errorLoggerCsystemtype = true
            return {errorHandlerClient}
          })
        }else{
          setSystemType(event.target.value)
          setInfoStateClient(prevState => {
          let infoObjClient = Object.assign({}, prevState.infoObjClient)
          infoObjClient.clientsystemtype = event.target.value
          return {infoObjClient}
        })
          setClientErrorRequest(prevState => {
          let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
          errorHandlerClient.errorLoggerCsystemtype = false
          return {errorHandlerClient}
        })
        }
      }
    const handleRequestorStatus = (event) => {
      if(event.target.valuue === null || event.target.value === ''){
        setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientrequestorstatus = ""
        return {infoObjClient}
        })
        setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCrequestor = true
        return {errorHandlerClient}
        })
      } else {
        setRequestorType(event.target.value)
        setBRStudent(budgetRangeStudent => budgetRangeStudent = 0)
        setBRBO(budgetRangeBO => budgetRangeBO = 0)
        setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientrequestorstatus = event.target.value
        return {infoObjClient}
        })
        setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCrequestor = false
        return {errorHandlerClient}
        })
      }
    }

    const handleProjectScale = (event) => {
      if(event.target.value === null || event.target.value === ''){
        setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientprojectscale = ""
        return {infoObjClient}
        })
        setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCprojectscale = true
        return {errorHandlerClient}
        })
      } else {
        setProjectScale(event.target.value)
        setBRStudent(budgetRangeStudent => budgetRangeStudent = 0)
        setBRBO(budgetRangeBO => budgetRangeBO = 0)
        setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientprojectscale = event.target.value
        return {infoObjClient}
        })
        setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCprojectscale = false
        return {errorHandlerClient}
        })
      }
    }
    
    const handleNextCredentialsClient = () => {
        if(!infoStateClient.infoObjClient.clientusername || !infoStateClient.infoObjClient.clientpassword || 
          !infoStateClient.infoObjClient.clientconpass || !infoStateClient.infoObjClient.clientsecquestion || !infoStateClient.infoObjClient.clientsecanswer) {
          Toast.fire({
            icon: 'error',
            title: 'Empty fields. please try again.'
          })
          return false
        } else if(infoStateClient.infoObjClient.clientpassword !== infoStateClient.infoObjClient.clientconpass) {
          Toast.fire({
            icon: 'error',
            title: 'Password mismatch'
          })
          return false
        } else {
          console.log(infoStateClient.infoObjClient)
          setLoading(true)
          dispatch(checkClient(infoStateClient.infoObjClient))
          setTimeout(() => {
            if(clientref.current[0].key === "client_username_available") {
              setLoading(false)
              setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
            else {
              Toast.fire({
                icon: 'error',
                title: 'Username already taken.'
              })
              setLoading(false)
              return false
            }
          }, 2000)
        }
      }
      const handleCloseModal = () => {
        setIsOpen(false)
        setModalOpen(false)
    }
      const onModal = () => {
        setModalOpen(true)
        setIsOpen(false)
      }
  const handleFinishClient = () => {
    if(!termsandconditions){
      Toast.fire({
        icon: 'warning',
        title: 'Please check our terms and conditions first'
      })
      return false
    } else {
      console.log(infoStateClient.infoObjClient)
      setLoading(true)
      setTimeout(() => {
          dispatch(pushCreateClient(infoStateClient.infoObjClient))
      }, 1000)
      setTimeout(() => {
          if(refregisterSuccessClient.current[0].key === "client_registration_success") {
            setLoading(false)
            Toast.fire({
              icon: 'success',
              title: 'You have successfully created an account.'
            })
            setInfoStateClient(prevState => {
            let infoObjClient = Object.assign({}, prevState.infoObjClient)
            infoObjClient.clientfname = undefined
            infoObjClient.clientlname = undefined
            infoObjClient.clientemail = undefined
            infoObjClient.clientcontact = undefined
            infoObjClient.clientaddress = undefined
            infoObjClient.clientusername = undefined
            infoObjClient.clientpassword = undefined
            infoObjClient.clientconpass = undefined
            infoObjClient.clientsecquestion = undefined
            infoObjClient.clientsecanswer = undefined
            infoObjClient.clientsystemtype = undefined
            infoObjClient.clientrequestorstatus = undefined
            infoObjClient.clientprojectscale = undefined
            infoObjClient.clientbudgetrange = undefined
            infoObjClient.clientremarks = undefined
            infoObjClient.clientpayment = undefined
            setClientSecQuestion(clientSecQuestion => clientSecQuestion = "")
            setSystemType(systemType => systemType = "")
            setRequestorType(requestorType => requestorType = "")
            setProjectScale(projectScale => projectScale = "")
            setPayment(payment => payment = "")
            setTermsandConditions(false);
            return {infoObjClient}
            })
            setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
            setClientActiveStep((prevActiveStep) => prevActiveStep = 0);
          } 
      }, 2000)
    }
  }

  const handleNextClient = () => {
  // It matches either of the following formats 1. +639191234567, or 2. 09191234567
  const validContactno = /((^(\+)(\d){12}$)|(^\d{11}$))/;
  const validEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  console.log(infoStateClient.infoObjClient)
  if(infoStateClient.infoObjClient === undefined){
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCfname = true
      errorHandlerClient.errorLoggerClname = true
      errorHandlerClient.errorLoggerCcontact = true
      errorHandlerClient.errorLoggerCaddress = true
      return {errorHandlerClient}
    })
    setHelperTextClient("Empty field")
    Toast.fire({
      icon: 'error',
      title: 'Empty fields. please try again.'
    })
    setClientEmailErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCemail = true
      return {errorHandlerClient}
    })
    setEmailTextClient("Empty field")
    Toast.fire({
      icon: 'error',
      title: 'Empty fields. please try again.'
    })
    return false
  }
  else if(!infoStateClient.infoObjClient.clientfname || !infoStateClient.infoObjClient.clientlname
      || !infoStateClient.infoObjClient.clientemail || !infoStateClient.infoObjClient.clientcontact 
      || !infoStateClient.infoObjClient.clientaddress){
      Toast.fire({
        icon: 'error',
        title: 'Empty fields. please try again.'
      })
      return false
    }
    else if(!validEmail.test(infoStateClient.infoObjClient.clientemail))
    {
      Toast.fire({
        icon: 'error',
        title: 'Please provide a valid email address'
      })
      return false
    }
    else if(!validContactno.test(infoStateClient.infoObjClient.clientcontact))
    {
      Toast.fire({
        icon: 'error',
        title: 'Invalid Contact Number'
      })
      return false
    }
  else{
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientremarks = ""
      return {infoObjClient}
      })
    setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
 }

  const handleNextRequestProposal = () => {
    console.log(infoStateClient.infoObjClient);
      if(infoStateClient.infoObjClient === undefined){
        setClientErrorRequest(prevState => {
          let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
          errorHandlerClient.errorLoggerCsystemtype = true
          errorHandlerClient.errorLoggerCrequestor = true
          errorHandlerClient.errorLoggerCprojectscale = true
          errorHandlerClient.errorLoggerCbudgetrange = true
          errorHandlerClient.errorLoggerCremarks = true
          return {errorHandlerClient}
        })
        setHelperTextClient("Empty field")
        Toast.fire({
          icon: 'error',
          title: 'Empty fields. please try again.'
        })
        return false
      }
      else if(!infoStateClient.infoObjClient.clientsystemtype || !infoStateClient.infoObjClient.clientrequestorstatus
          || !infoStateClient.infoObjClient.clientprojectscale || !infoStateClient.infoObjClient.clientbudgetrange 
          || !infoStateClient.infoObjClient.clientremarks){
          Toast.fire({
            icon: 'error',
            title: 'Empty fields. please try again.'
          })
          return false
      } else {
        setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  
  const handleRadioChange = (event) => {
     setPayment(event.target.value);
  }

  const handleNextPayment = (event) => {
    console.log(payment);
    if(payment === ''){
      Toast.fire({
        icon: 'error',
        title: 'Please choose a payment method.'
      })
    } else {
      setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({},prevState.infoObjClient)
      infoObjClient.clientpayment = payment
      return {infoObjClient}
      })
      setClientActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  const handleBackClient = () => {
  setClientActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClientFnameChange = (e) => {
    if(e.target.value === null || e.target.value === ''){
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCfname = true
        return {errorHandlerClient}
      })
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientfname = ""
        return {infoObjClient}
      })
      setHelperTextClient("Empty field")
    } else {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientfname = e.target.value
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCfname = false
        return {errorHandlerClient}
      })
      setHelperTextClient("")
    }
 }
  const handleClientLnameChange = (e) => {
  if(e.target.value === null || e.target.value === '') {
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientlname = ""
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerClname = true
      return {errorHandlerClient}
    })
    setHelperTextClient("Empty field")
  } else {
     setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientlname = e.target.value
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerClname = false
      return {errorHandlerClient}
    })
    setHelperTextClient("")
  }
}
const handleEmailChangeClient = (e) => {
  if(e.target.value === null || e.target.value === ''){
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientemail = ""
      return {infoObjClient}
    })
    setClientEmailErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCemail = true
      return {errorHandlerClient}
    })
    setEmailTextClient("Please provide a valid email address")
  }else{
      setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientemail = e.target.value
      return {infoObjClient}
    })
    setClientEmailErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCemail = false
      return {errorHandlerClient}
    })
    setEmailTextClient("")
  }
}
const handleContactChangeClient = (e) => {
  if(e.target.value === null || e.target.value === ''){
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientcontact = ""
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCcontact = true
      return {errorHandlerClient}
    })
    setHelperTextClient("Empty field")
  }else{
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientcontact = e.target.value
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCcontact = false
      return {errorHandlerClient}
    })
    setHelperTextClient("")
  }
}
const handleAddressChangeClient = (e) => {
  if(e.target.value === null || e.target.value === ''){
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientaddress = ""
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCaddress = true
      return {errorHandlerClient}
    })
    setHelperTextClient("Empty field")
  }else{
    setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientaddress = e.target.value
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCaddress = false
      return {errorHandlerClient}
    })
    setHelperTextClient("")
    }
  }

  const handleClientRemarks = (e) => {
    if(e.target.value === null || e.target.value === ''){
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientremarks = ""
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCremarks = true
        return {errorHandlerClient}
      })
      setHelperTextClient("Empty field")
    }else{
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientremarks = e.target.value
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCremarks = false
        return {errorHandlerClient}
      })
      setHelperTextClient("")
      }
    }

  const handleClientUsername = (e) => {
    if(e.target.value === null || e.target.value === '') {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientusername = ""
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCusername = true
        return {errorHandlerClient}
      })
      setHelperTextClient("Empty field")
    } else {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientusername = e.target.value
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCusername = false
        return {errorHandlerClient}
      })
      setHelperTextClient("")
    }
  }
  const handleClientPassword = (e) => {
    if(e.target.value === null || e.target.value === '') {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientpassword = ""
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCpassword = true
        return {errorHandlerClient}
      })
      setHelperTextClient("Empty field")
    } else {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientpassword = e.target.value
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCpassword = false
        return {errorHandlerClient}
      })
      setHelperTextClient("")
    }
  }
  const handleClientConfirmPassword = (e) => {
    if(e.target.value === null || e.target.value === '') {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientconpass = ""
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCconpass = true
        return {errorHandlerClient}
      })
      setHelperTextClient("Empty field")
    } else {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientconpass = e.target.value
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCconpass = false
        return {errorHandlerClient}
      })
      setHelperTextClient("")
    }
  }

  const handleClientSecQuestions = (event) => {
    
    if(event.target.value === null || event.target.value === '') {
      setClientSecQuestion("")
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientsecquestion = ""
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCsecquestion = true
        return {errorHandlerClient}
      })
    }else{
      setClientSecQuestion(event.target.value)
      setInfoStateClient(prevState => {
      let infoObjClient = Object.assign({}, prevState.infoObjClient)
      infoObjClient.clientsecquestion = event.target.value
      return {infoObjClient}
    })
    setClientErrorRequest(prevState => {
      let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
      errorHandlerClient.errorLoggerCsecquestion = false
      return {errorHandlerClient}
    })
    }
  }
  const handleClientSecAnswer = (e) => {
    if(e.target.value === null || e.target.value === '') {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientsecanswer = ""
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCsecanswer = true
        return {errorHandlerClient}
      })
      setHelperTextClient("Empty field")
    } else {
       setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientsecanswer = e.target.value
        return {infoObjClient}
      })
      setClientErrorRequest(prevState => {
        let errorHandlerClient = Object.assign({}, prevState.errorHandlerClient)
        errorHandlerClient.errorLoggerCsecanswer = false
        return {errorHandlerClient}
      })
      setHelperTextClient("")
    }
  }

    // CLIENT REGISTRATION
    const defaultClientValueSetter = () => {
      setInfoStateClient(prevState => {
        let infoObjClient = Object.assign({}, prevState.infoObjClient)
        infoObjClient.clientfname = undefined
        infoObjClient.clientlname = undefined
        infoObjClient.clientaddress = undefined
        infoObjClient.username = undefined
        infoObjClient.password = undefined
        infoObjClient.conpass = undefined
        infoObjClient.secquestion = undefined
        infoObjClient.secanswer = undefined
        infoObjClient.clientremarks = undefined
        return {infoObjClient}
      })
    }
    // CLIENT REGISTRATION //
    const StepHelperClient = () => {
      if(clientActiveStep === 0) {
          return(
              <React.Fragment>
             <div style={{marginTop: '20px', marginBottom: '20px'}}>
             <h4>Modern Resolve Client Registration</h4>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                          We will help you reach your goal, one step at a time...
                                  </Typography>
                                  <div style={{marginTop: '30px'}} className="row">
                                      <div className="col-sm">
                                      {
                                           MUIText({
                                            typography : "Firstname",
                                            dataOnChange : handleClientFnameChange,
                                            id: "outlined-basic",
                                            label: "Your firstname",
                                            type : "text",
                                            stylish : {width: '100%'},
                                            variant : "outlined",
                                            isError : clientErrorRequest.errorHandlerClient.errorLoggerCfname,
                                            helperTextHelper : errorHelperTextClient,
                                            value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientfname
                                          })
                                      }
                                      </div>
                                      <div className="col-sm">
                                      {
                                          MUIText({
                                            typography : "Lastname",
                                            dataOnChange : handleClientLnameChange,
                                            id: "outlined-basic",
                                            label: "Your lastname",
                                            type : "text",
                                            stylish : {width: '100%'},
                                            variant : "outlined",
                                            isError : clientErrorRequest.errorHandlerClient.errorLoggerClname,
                                            helperTextHelper : errorHelperTextClient,
                                            value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientlname
                                          })
                                        }
                                      </div>
                                  </div>
                                  <div className="row" style={{marginTop: '30px'}}>
                                  <div className="col-sm">
                                      {
                                          MUIText({
                                            typography : "Email Address",
                                            dataOnChange : handleEmailChangeClient,
                                            id: "outlined-basic",
                                            label: "Your Email",
                                            type : "text",
                                            stylish : {width: '100%'},
                                            variant : "outlined",
                                            isError : clientEmailErrorRequest.errorHandlerClient.errorLoggerCemail,
                                            helperTextHelper : errorEmailTextClient,
                                            value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientemail
                                          })
                                        }
                                      </div>
                                      <div className="col-sm">
                                      {
                                          MUIText({
                                            typography : "Contact Number",
                                            dataOnChange : handleContactChangeClient,
                                            id: "outlined-basic",
                                            label: "Your Contact",
                                            type : "text",
                                            stylish : {width: '100%'},
                                            variant : "outlined",
                                            isError : clientErrorRequest.errorHandlerClient.errorLoggerCcontact,
                                            helperTextHelper : errorHelperTextClient,
                                            value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientcontact
                                          })
                                        }
                                      </div>
                                  </div>
                                  <div style={{marginTop: '30px'}}>
                                  {
                                          MUIText({
                                            typography : "Primary Address",
                                            dataOnChange : handleAddressChangeClient,
                                            id: "outlined-multiline-flexible",
                                            label: "Your address",
                                            type : "text",
                                            stylish : {width: '100%'},
                                            isError : clientErrorRequest.errorHandlerClient.errorLoggerCaddress,
                                            helperTextHelper : errorHelperTextClient,
                                            value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientaddress
                                          })
                                        }
                                  </div>  
             </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={clientActiveStep === 0}
                  onClick={handleBackClient}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleNextClient}>
                  {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
              </React.Fragment>
          )
      }
      if(clientActiveStep === 1) {
        return(
            <React.Fragment>
           <div style={{marginTop: '20px', marginBottom: '20px'}}>
           <h4>Modern Resolve Client Registration</h4>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                We will help you reach your goal, one step at a time...
                                </Typography>
                                <div style={{marginTop: '30px'}} className="row">
                                    <div className="col-sm">
                                            {BasicSelect({
                                              value : systemType,
                                              handleSelect : handleSystemType,
                                              selectionArray : systemTypesArray,
                                              selectionTitle : 'Select System Type',
                                              isError: clientErrorRequest.errorHandlerClient.errorLoggerCsystemtype
                                            })}
                                    </div>
                                    <div className="col-sm">
                                            {BasicSelect({
                                              value : requestorType,
                                              handleSelect : handleRequestorStatus,
                                              selectionArray : requestorStatusArray,
                                              selectionTitle : `Requestor's Status`,
                                              isError: clientErrorRequest.errorHandlerClient.errorLoggerCrequestor
                                            })}
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: '30px'}}>
                                   <div className="col-sm">
                                             {BasicSelect({
                                              value : projectScale,
                                              handleSelect : handleProjectScale,
                                              selectionArray : projectScaleArray,
                                              selectionTitle : `Select Project Scale`,
                                              isError: clientErrorRequest.errorHandlerClient.errorLoggerCprojectscale
                                            })}
                                    </div>
                                   <div className="col-sm">
                                     <center>
                                        {BudgetHelper()}
                                     </center>
                                    </div>
                                </div>
                                <div style={{marginTop: '30px'}}>
                                {
                                        MUIText({
                                          typography : "Remarks / Comments",
                                          dataOnChange : handleClientRemarks,
                                          id: "outlined-basic",
                                          label: "",
                                          type : "text",
                                          stylish : {width: '100%'},
                                          variant : "outlined",
                                          isError : clientErrorRequest.errorHandlerClient.errorLoggerCremarks,
                                          helperTextHelper : errorHelperTextClient,
                                          value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientremarks
                                        })
                                  }
                                </div>  
           </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={clientActiveStep === 0}
                onClick={handleBackClient}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNextRequestProposal}>
                {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
            </React.Fragment>
        )
    }
    else if(clientActiveStep === 2) {
      const paymentOptions = [
        {value: 'creditdebit', label: 'Credit/Debit', image: `${visa}`, alt: 'creditdebit'},
        {value: 'gcash', label: 'Gcash', image: `${gcash}`, alt: 'gcash'}
      ]
      return(
        <React.Fragment>
       <div style={{marginTop: '20px', marginBottom: '20px'}}>
       <h4>Choose your payment method</h4>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    How do you want to pay?
                            </Typography>
                            <FormControl style={{marginTop: '40px'}}>
                            <RadioGroup
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              value={payment}
                              name="radio-buttons-group"
                              onChange={handleRadioChange}
                            >
                              {paymentOptions.map(({value, label, image, alt}) => {
                                return  <div className="col-md-4">
                                <FormControlLabel value={value} control={<Radio />} label={label}/>
                                <img src={image} alt={alt} style={{width: '30%', height: 'auto'}}/>
                                </div>
                              })}
                            </RadioGroup>
                          </FormControl>              
       </div>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={clientActiveStep === 0}
            onClick={handleBackClient}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button onClick={handleNextPayment}>
            {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
        </React.Fragment>
    )
  } 
      else if(clientActiveStep === 3) {
        return (
            <React.Fragment>
             <div style={{marginTop: '20px', marginBottom: '20px'}}>
             <h4>Credentials</h4>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Credentials Information will provide here.
                                </Typography>

                                <div style={{marginTop: '30px'}}>
                                  {
                                     MUIText({
                                      typography : "Username",
                                      dataOnChange : handleClientUsername,
                                      id: "outlined-basic",
                                      label: "Your username",
                                      type : "text",
                                      stylish : {width: '100%'},
                                      helperTextHelper : errorHelperTextClient,
                                      isError : clientErrorRequest.errorHandlerClient.errorLoggerCusername,
                                      value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientusername
                                    })
                                  }
                                  {
                                     MUIText({
                                      typography : "Password",
                                      dataOnChange : handleClientPassword,
                                      id: "outlined-basic",
                                      label: "Your password",
                                      type : "password",
                                      stylish : {width: '100%'},
                                      helperTextHelper : errorHelperTextClient,
                                      isError : clientErrorRequest.errorHandlerClient.errorLoggerCpassword,
                                      value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientpassword
                                    })
                                  }
                                  {
                                     MUIText({
                                      typography : "Confirm Password",
                                      dataOnChange : handleClientConfirmPassword,
                                      id: "outlined-basic",
                                      label: "Confirm your password",
                                      type : "password",
                                      stylish : {width: '100%'},
                                      helperTextHelper : errorHelperTextClient,
                                      isError : clientErrorRequest.errorHandlerClient.errorLoggerCconpass,
                                      value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientconpass
                                    })
                                  }
                                  <div className="row" style={{marginTop: '30px'}}>
                                    <div className="col-sm">
                                            {BasicSelect({
                                              value : clientSecQuestion,
                                              handleSelect : handleClientSecQuestions,
                                              selectionArray : secQuestionsArray,
                                              selectionTitle : 'Security Questions'
                                            })}
                                    </div>
                                    <div className="col-sm">
                                    {
                                          MUIText({
                                            typography : "Security Answer",
                                            dataOnChange : handleClientSecAnswer,
                                            id: "outlined-basic",
                                            label: "Security Answer",
                                            type : "text",
                                            stylish : {width: '100%'},
                                            variant : "outlined",
                                            isError : clientErrorRequest.errorHandlerClient.errorLoggerCsecanswer,
                                            helperTextHelper : errorHelperTextClient,
                                            value : (infoStateClient.infoObjClient === undefined) ? defaultClientValueSetter : infoStateClient.infoObjClient.clientsecanswer
                                          })
                                        }
                                    </div>
                                  </div>
                                  <Backdrop
                                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                  open={isLoading}
                                  onClick={handleCloseBackDrop}
                                >
                                  <CircularProgress color="inherit" />
                                </Backdrop>
                                </div>
             </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={clientActiveStep === 0}
                onClick={handleBackClient}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNextCredentialsClient}>
                {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
            </React.Fragment>
        )
    } else if(clientActiveStep === 4) {
      return(
        <React.Fragment>
           <div style={{marginTop: '20px', marginBottom: '20px'}}>
           <h4>You're all caught up !</h4>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Kindly review your data information to proceed to account registration
                                </Typography>
           </div>
            <div className="row" style={{marginTop: '30px', textAlign: 'center'}}>
              <div className="col-3">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Primary Information
              </Typography>
                    <div className="row">
                          <TextField
                          disabled
                          id="outlined-disabled"
                          label="Firstname"
                          value={infoStateClient.infoObjClient.clientfname}
                          style={{margin: '10px 0px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Lastname"
                          value={infoStateClient.infoObjClient.clientlname}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Email Address"
                          value={infoStateClient.infoObjClient.clientemail}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Contact No"
                          value={infoStateClient.infoObjClient.clientcontact}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Address"
                          value={infoStateClient.infoObjClient.clientaddress}
                          style={{marginBottom: '10px'}}
                        />
                    </div>
              </div>
              <div className="col-3" style={{marginLeft: '20px'}}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Request Client Proposal
              </Typography>
                 <div className="row">
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="System Type"
                          value={systemType}
                          style={{margin: '10px 0px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Requestor Status"
                          value={requestorType === "student" ? "Student" : "Business Owner"}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Project Scale"
                          value={projectScale === 'small_scale' ? "Small Scale" : projectScale === 'medium_scale' ? "Medium Scale" : "Large Scale"}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Budget Range"
                          value={`₱ ${infoStateClient.infoObjClient.clientbudgetrange}`}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Remarks / Comments"
                          value={infoStateClient.infoObjClient.clientremarks}
                          style={{marginBottom: '10px'}}
                        />        
                        </div>
              </div>
              <div className="col-3" style={{marginRight: '-20px'}}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Payment Method
              </Typography>
                       <TextField
                          disabled
                          id="outlined-disabled"
                          label="Payment Method"
                          value={infoStateClient.infoObjClient.clientpayment}
                          style={{margin: '10px 0px'}}
                        />
              </div>
              <div className="col-3">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Credentials
              </Typography>
                    <div className="row">
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Username"
                          value={infoStateClient.infoObjClient.clientusername}
                          style={{margin: '10px 0px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Password"
                          value={infoStateClient.infoObjClient.clientpassword}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Security Question"
                          value={clientSecQuestion}
                          style={{marginBottom: '10px'}}
                        />
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label="Security Answer"
                          value={infoStateClient.infoObjClient.clientsecanswer}
                          style={{marginBottom: '10px'}}
                        />
                      </div>
                     </div>
                  </div>
              <BootstrapDialog
              maxWidth='sm'
              fullWidth={true}
              onClose={handleCloseModal}
              aria-labelledby="customized-dialog-title"
              open={modal}
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                Terms and Conditions
              </BootstrapDialogTitle>
              <DialogContent dividers>
              <TermsAConditions/>
              </DialogContent>
            </BootstrapDialog>

           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={clientActiveStep === 0}
                onClick={handleBackClient}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <FormGroup style={{display: 'flex', flexDirection:'row'}}
              value={termsandconditions}>
              <FormControlLabel control={<Checkbox />} value={value} onClick={() => setTermsandConditions(!termsandconditions)} style={{marginRight: '-10px'}}/>
              {
              MUIButton({
                variant : "text",
                onhandleClick : onModal,
                buttonName: "I agree with the terms and conditions"
              })
              }
              </FormGroup>
              <Button onClick={handleFinishClient}>
                {clientActiveStep === clientSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
        </React.Fragment>
      )
    }  
  }
    return (
        <div>
            <Navbar />
            <div style={{marginTop: '150px'}} className="container">
            <Card sx={{ minWidth: 275 }} style={{marginBottom: '30px'}}>
                        <CardContent>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab wrapped label="Client Registration" {...a11yProps(0)} />
                                    <Tab wrapped label="Developer Registration" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <Stepper activeStep={clientActiveStep}>
                                            {clientSteps.map((label, index) => {
                                            const stepProps = {};
                                            const labelProps = {};

                                            return (
                                                <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                            })}
                                    </Stepper>
                                        {StepHelperClient()}
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};

                                        return (
                                            <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                        })}
                                    </Stepper>
                                    {StepHelper()}
                                </TabPanel>
                                </Box>
                        </CardContent>
                    </Card>
            </div>
        </div>
    )
}

export default AppRegistration