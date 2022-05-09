import React, {useState, useEffect, useRef} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicTable from '../../../components/Table/Table';
import MUIButton from '../../../components/Button/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MUIText from '../../../components/TextField/TextField'
import BasicSelect from '../../../components/Select/Select';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { pushCreateUsermanagement } from '../../../redux/core/admin/usermanagementSlice';

const userObj = {
    firstname : null, 
    lastname : null,
    branch : null,
    branchStatus : null,
    username : null,
    password : null,
    conpass : null
}
const branches = [
    {
        branchID : 1,
        label : 'Developers Branch',
        value : '2'
    }
]
const branchStatusArr = [
    {
        branchStatusID : 1,
        label : 'Activate',
        value : '1'
    },
    {
        branchStatusID : 2,
        label : 'Deactivate',
        value : '2'
    },
]
const AddUser = () => {
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
    const dispatch = useDispatch()
    const [uamMessage] = useSelector((state) => [state.uam.uamMessage])
    const uamRef = useRef(uamMessage)
    const [adduserState, setadduserState] = useState(false)
    const [userState, setuserState] = useState(userObj)
    const [branchType, setBranchType] = useState('')
    const [branchStatus, setBranchStatus] = useState('')
    const [userBranchArr , setuserbranchArr] = useState(branches)
    const [userBranchStatus, setuserbranchStatus] = useState(branchStatusArr)
    const [isLoading, setLoading] = React.useState(false)
    const [errorRequest, setErrorRequest] = useState(
        {
            errorHandler : {
                errorLoggerFname : false,
                errorLoggerLname : false,
                errorLoggerBranch : false,
                errorLoggerBranchStatus : false,
                errorLoggerUsername : false,
                errorLoggerPassword : false,
                errorLoggerConPass : false
            }
        }
    )
    const [errorHelperText, setHelperText] = React.useState('')
    const handleAdduser = () => {
        setadduserState(true)
    }
    const handleCancel = () => {
        setadduserState(false)
    }
    useEffect(() => {
        uamRef.current = uamMessage
    }, [uamMessage])
    const handleSave = () => {
        if(userState.userObj === undefined) {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerFname = true
                errorHandler.errorLoggerLname = true
                errorHandler.errorLoggerBranch = true
                errorHandler.errorLoggerBranchStatus = true
                errorHandler.errorLoggerUsername = true
                errorHandler.errorLoggerPassword = true
                errorHandler.errorLoggerConPass = true
                return {errorHandler}
            })
            setHelperText("Empty field")
            Toast.fire({
                icon: 'error',
                title: 'Empty fields. please try again.'
              })
              return false
        } else {
            setadduserState(false)
            setLoading(true)
            setTimeout(() => {
                dispatch(pushCreateUsermanagement(userState.userObj))
            }, 1000)
            setTimeout(() => {
                if(uamRef.current[0].key === 'username_exist') {
                    setLoading(false)
                    Toast.fire({
                        icon: 'error',
                        title: 'Username already exist.'
                      })
                      setadduserState(true)
                      return false
                } else if(uamRef.current[0].key === 'success_uam_create') {
                    setLoading(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully Created.'
                      })
                }
            }, 2000)
        }
    }
    const handleFirstname = (event) => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerFname = true
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.firstname = ""
                return {userObj}
            })
            setHelperText("Empty field")
        } else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerFname = false
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.firstname = event.target.value
                return {userObj}
            })
            setHelperText("")
        }
    }
    const handleLastname = (event) => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerLname = true
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.lastname = ""
                return {userObj}
            })
            setHelperText("Empty field")
        } else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerLname = false
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.lastname = event.target.value
                return {userObj}
            })
            setHelperText("")
        }
    }
    const defaultValueSetter = () => {
        setuserState(prev => {
            let userObj = Object.assign({}, prev.userObj)
            userObj.firstname = undefined
            userObj.lastname = undefined
            return {userObj}
        })
    }
    const handleBranchType = (e) => {
        if(e.target.value === null || e.target.value === '') {
            setBranchType("")
            setuserState(errorState => {
                let userObj = Object.assign({}, errorState.userObj)
                userObj.branch = ""
                return {userObj}
            })
            setErrorRequest(errRequestState => {
                let errorHandler = Object.assign({}, errRequestState.errorHandler)
                errorHandler.errorLoggerBranch = true
                return {errorHandler}
            })
        } else {
            setBranchType(e.target.value)
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.branch = e.target.value
                return {userObj}
            })
            setErrorRequest(errRequestState => {
                let errorHandler = Object.assign({}, errRequestState.errorHandler)
                errorHandler.errorLoggerBranch = false
                return {errorHandler}
            })
        }
    }
    const handleBranchStatus = (e) => {
        if(e.target.value === null || e.target.value === '') {
            setBranchStatus("")
            setuserState(errorState => {
                let userObj = Object.assign({}, errorState.userObj)
                userObj.branchStatus = ""
                return {userObj}
            })
            setErrorRequest(errRequestState => {
                let errorHandler = Object.assign({}, errRequestState.errorHandler)
                errorHandler.errorLoggerBranchStatus = true
                return {errorHandler}
            })
        } else {
            setBranchStatus(e.target.value)
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.branchStatus = e.target.value
                return {userObj}
            })
            setErrorRequest(errRequestState => {
                let errorHandler = Object.assign({}, errRequestState.errorHandler)
                errorHandler.errorLoggerBranchStatus = false
                return {errorHandler}
            })
        }
    }
    const handleUsername = (event) => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerUsername = true
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.username = ""
                return {userObj}
            })
            setHelperText("Empty field")
        } else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerUsername = false
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.username = event.target.value
                return {userObj}
            })
            setHelperText("")
        }
    }
    const handlePassword = (event) => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerPassword = true
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.password = ""
                return {userObj}
            })
            setHelperText("Empty field")
        } else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerPassword = false
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.password = event.target.value
                return {userObj}
            })
            setHelperText("")
        }
    }
    const handleConfirmPassword = (event) => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerConPass = true
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.conpass = ""
                return {userObj}
            })
            setHelperText("Empty field")
        } else if(event.target.value != userState.userObj.password) {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerConPass = true
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.conpass = event.target.value
                return {userObj}
            })
            setHelperText("Password not match")
        } 
         else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerConPass = false
                return {errorHandler}
            })
            setuserState(prevState => {
                let userObj = Object.assign({}, prevState.userObj)
                userObj.conpass = event.target.value
                return {userObj}
            })
            setHelperText("")
        }
    }
    const addnewuserDialog = () => {
        return(
            <>
            <Dialog
                maxWidth='lg'
                fullWidth={true}
                open={adduserState}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                Add new user
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-sm">
                            {
                                MUIText({
                                    typography : "Firstname",
                                    dataOnChange : handleFirstname,
                                    id: "outlined-basic",
                                    label: "Enter your firstname",
                                    type : "text",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerFname,
                                    helperTextHelper : errorHelperText,
                                    value : (userState.userObj === undefined) ? defaultValueSetter : userState.userObj.firstname
                                  })
                            }
                        </div>
                        <div className="col-sm">
                            {
                                MUIText({
                                    typography : "Lastname",
                                    dataOnChange : handleLastname,
                                    id: "outlined-basic",
                                    label: "Enter your lastname",
                                    type : "text",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerLname,
                                    helperTextHelper : errorHelperText,
                                    value : (userState.userObj === undefined) ? defaultValueSetter : userState.userObj.lastname
                                  })
                            }
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}} className="row">
                        <div className="col-sm">
                        {
                                MUIText({
                                    typography : "Username",
                                    dataOnChange : handleUsername,
                                    id: "outlined-basic",
                                    label: "Enter your username",
                                    type : "text",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerUsername,
                                    helperTextHelper : errorHelperText,
                                    value : (userState.userObj === undefined) ? defaultValueSetter : userState.userObj.username
                                  })
                            }
                        </div>
                        <div className="col-sm">
                        {
                                MUIText({
                                    typography : "Password",
                                    dataOnChange : handlePassword,
                                    id: "outlined-basic",
                                    label: "Enter your password",
                                    type : "password",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerPassword,
                                    helperTextHelper : errorHelperText,
                                    value : (userState.userObj === undefined) ? defaultValueSetter : userState.userObj.password
                                  })
                            }
                        </div>
                        <div className="col-sm">
                        {
                                MUIText({
                                    typography : "Confirm Password",
                                    dataOnChange : handleConfirmPassword,
                                    id: "outlined-basic",
                                    label: "Confirm password",
                                    type : "password",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerConPass,
                                    helperTextHelper : errorHelperText,
                                    value : (userState.userObj === undefined) ? defaultValueSetter : userState.userObj.conpass
                                  })
                            }
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}} className="row">
                            <div className="col-sm">
                            {BasicSelect({
                                              value : branchType,
                                              handleSelect : handleBranchType,
                                              selectionArray : userBranchArr,
                                              selectionTitle : 'Select Branch'
                                            })}
                            </div>
                            <div className="col-sm">
                            {BasicSelect({
                                              value : branchStatus,
                                              handleSelect : handleBranchStatus,
                                              selectionArray : userBranchStatus,
                                              selectionTitle : 'Select Branch Status'
                                            })}
                            </div>
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} autoFocus>
                    Save
                </Button>
                </DialogActions>
            </Dialog>            
            </>
        )
    }
    return(
        <>
            <div className='container' style={{marginTop: '100px'}}>
            <div style={{marginBottom : '50px'}}>
                    <h3>User Access Management</h3>
                    <p>You can manage all users and access here .</p>
            </div>
            <Card style={{width: '100%'}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                User Management
                            </Typography>
                            {
                                MUIButton({
                                    variant : "contained",
                                    onhandleClick : handleAdduser,
                                    buttonName: "Add new user",
                                    stylish : {float : 'right', marginTop: '10px', marginBottom: '10px'}
                                    
                                })
                            }
                            {BasicTable()}
                            {
                                addnewuserDialog()
                            }
                             <Backdrop
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      open={isLoading}
                                    >
                                      <CircularProgress color="inherit" />
                                    </Backdrop>
                            </CardContent>
            </Card>
            </div>
        </>
    )
}

export default AddUser