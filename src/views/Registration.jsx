import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
const steps = ['Personal Information', 'Credentials Information', 'Create an ad'];
const infoObj = {
  fname : "", lname : "", occupationStatus: '', occupationDetails : "", occupationPositionWork : '', nameOfSchool : '', degree : '', address : ''
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
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [infoState, setInfoState] = React.useState(infoObj)
    const [occupation, setOccupation] = React.useState('');
    const [study, setStudy] = React.useState('')
    const [errorRequest, setErrorRequest] = React.useState({
      errorHandler : {
        errorLoggerFname : false,
        errorLoggerLname : false,
        errorLoggerNameOfCompany: false,
        errorLoggerPositionWork : false,
        errorLoggerSchoolName : false,
        errorLoggerAddress : false,
        errorLoggerIsStudy : false,
        errorLoggerOccupation : false
      }
    })
    const [errorHelperText, setHelperText] = React.useState('')
    const handleOccupation = (event) => {
      if(event.target.value === null || event.target.value === '') {
        setOccupation("")
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
        setValue(newValue);
    };
    
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
          if(!infoState.infoObj.fname || !infoState.infoObj.lname
            || !infoState.infoObj.occupationStatus || !infoState.infoObj.occupationDetails
            || !infoState.infoObj.occupationPositionWork || !infoState.infoObj.nameOfSchool
            || !infoState.infoObj.degree || !infoState.infoObj.address){
              Toast.fire({
                icon: 'error',
                title: 'Empty fields. please try again.'
              })
              return false
            }else{
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                id: "outlined-basic",
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
                                              occupation : study,
                                              handleOccupation : handleStudy,
                                              occupationArray : studyStatus,
                                              isError : errorRequest.errorHandler.errorLoggerIsStudy
                                            })}
          </>
        )
      }
    }
   
    const defaultValueSetter = () => {
      setInfoState(prevState => {
        let infoObj = Object.assign({}, prevState.infoObj)
        infoObj.fname = ""
        infoObj.lname = ""
        infoObj.occupationDetails = ""
        infoObj.occupationPositionWork = ""
        infoObj.nameOfSchool = ""
        infoObj.degree = ""
        infoObj.address = ""
        return {infoObj}
      })
    }
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
                                              occupation : occupation,
                                              handleOccupation : handleOccupation,
                                              occupationArray : occupationArray,
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
        }
    }
    return (
        <div>
            <Navbar />
            <div style={{marginTop: '150px'}} className="container">
            <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab wrapped label="Client Registration" {...a11yProps(0)} />
                                    <Tab wrapped label="Developer Registration" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    Item One
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