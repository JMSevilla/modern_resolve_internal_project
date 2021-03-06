import React, {createContext, useState, useRef, useEffect} from 'react'
import Spiels from '../data/Spiels'
import {pushTokenRouteUpdate} from '../branchSlice'
import { pushLogin, authIdentify } from '../loginSlice'
import { pushSignout } from '../signoutSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { localstorageHelper } from '../data/storage'
import Swal from 'sweetalert2'
import { appRouter } from '../../../router/route'
import {checkdev, create_developers_account} from '../developerSlice'
import { utils_response, utils_modified_response } from '../utils/breaker'
import { developer_account_creation_compressor } from '../utils/compressor'
import { spielsClearing } from '../utils/spielsClearing'

import FormService from '../../Utilization'

const Context = createContext()

const FieldContext = ({children}) => {
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
    const [open, setIsOpen] = useState(false)
    const [settings, setSettings] = useState(Spiels.fields)
    const [isLoading, setLoading] = useState(false)
    const [activeSteps, setActiveSteps] = useState(0)
    const [branchMessage,
        token,
        savedInfo,
        initialRoute,
        signoutMessage,
        check_response,
        create_response] = useSelector((state) => [
        state.branch.branchMessage,
        state.login.token,
        state.login.savedInfo,
        state.login.initialRoute,
        state.signout.signoutMessage,
        state.developer.check_response,
        state.developer.create_response
    ])
    const signoutref = useRef(signoutMessage)
    const scanned = useRef(initialRoute)
    const fieldRef = useRef(branchMessage)
    const signinReference = useRef(token)
    const devObjReference = useRef(check_response)
    const devCreateObjReference = useRef(create_response)
    const savedInfoRef = useRef(savedInfo)
    const dispatch = useDispatch()
    const history = useHistory()
    /* use Effects */
    useEffect(() => {
        fieldRef.current = branchMessage
        signinReference.current = token
        signoutref.current = signoutMessage
        devObjReference.current = check_response
        devCreateObjReference.current = create_response
        savedInfoRef.current = savedInfo
    },[branchMessage, token, signoutMessage, check_response, create_response, savedInfo])
    useEffect(() => {
        scanned.current = initialRoute
    }, [initialRoute])
    /* end use Effects */
    const handleNavigate = (route, index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = {...tempAllFieldsSelected[index]}
        if(route == '/developer/dashboard') {
            setLoading(true)
            FormService.service_updateroute(route)
            .then((res) => {
                const fieldSettings = {
                    ResponseMessage : fieldRef.current,
                    registeredRoute : route
                }
                setLoading(false)
                tempFieldSelected.fieldSettings = fieldSettings
                setSettings(tempAllFieldsSelected)
                if(res.data == 'route_updated'){
                    history.push(tempFieldSelected.fieldSettings.registeredRoute)
                    setLoading(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully navigate to developer dashboard.'
                    })
                }
            }) 
        }
    }
    const handleChangeBranch = (route, index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = {...tempAllFieldsSelected[index]}
        if(route == 'developer_platform') {
            setLoading(true)
            dispatch(pushTokenRouteUpdate(route))
            setTimeout(() => {
                const fieldSettings = {
                    ResponseMessage : fieldRef.current,
                    registeredRoute : route
                }
                tempFieldSelected.fieldSettings = fieldSettings
                setSettings(tempAllFieldsSelected)
                if(tempFieldSelected.fieldSettings.ResponseMessage[0].key == 'route_updated'){
                    history.push(appRouter.devPlatform.path)
                    setLoading(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully navigate to developer platform.'
                    })
                }
            },1000)
        }
    }
    const handleSigninProceed = (index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = { ...tempAllFieldsSelected[index] }
        let validateSettings
        validateSettings = {
            username : tempFieldSelected.fieldSettings.username,
            password : tempFieldSelected.fieldSettings.password,
            userLogin : tempFieldSelected.fieldSettings.userLogin,
            role : tempFieldSelected.fieldSettings.role
        }
        if(!validateSettings.username || !validateSettings.password) {
            Toast.fire({
                icon: 'error',
                title: 'Empty fields. please try again.'
            })
            return false
        } else {
            setIsOpen(false)
            setLoading(true)
            FormService.service_login(tempFieldSelected.fieldSettings)
            .then((res) => {
                if(res.data.message === 'success_developer'){
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully logged in.'
                    })
                    setLoading(false)
                    const key = res.data.uid
                    let dump = []
                    dump.push({
                        fname : res.data.fname,
                        lname : res.data.lname,
                        uname : res.data.uname,
                        role : res.data.role,
                        uid : res.data.uid
                    })
                    localstorageHelper.store('keySaved', dump)
                    localstorageHelper.store('key_identifier', key)
                    tempFieldSelected.message = res.data.message
                    setSettings(tempAllFieldsSelected)
                    history.push(tempFieldSelected.router.login)
                }else if (res.data === 'ACCOUNT_NOT_FOUND') {
                    Toast.fire({
                        icon: 'error',
                        title: 'Sorry, but the account was not found.'
                    })
                    setLoading(false)
                } else if(res.data === 'ACCOUNT_LOCK') {
                    Toast.fire({
                        icon: 'error',
                        title: 'Your account is lock, please contact the administrator.'
                    })
                    setLoading(false)
                }
                 else {
                    Toast.fire({
                        icon: 'error',
                        title: 'The username or password you have entered is wrong.'
                    })
                    setLoading(false)
                }
            })
        }
    }
    const handleSigninUsername = (event, index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = { ...tempAllFieldsSelected[index] }
        let value = event.currentTarget.value
        const fieldSettings = {
            username : value,
            password : tempFieldSelected.fieldSettings.password,
            userLogin : tempFieldSelected.fieldSettings.userLogin,
            role : tempFieldSelected.fieldSettings.role
        }
        const errorProvider = {
            error_username : !value ? true : false,
            error_password : tempFieldSelected.errorProvider.error_password,
            error_role : tempFieldSelected.errorProvider.error_role
        }
        const error_provider_message = {
            epm_username : !value ? 'Kindly provide your username' : '',
            epm_password : tempFieldSelected.error_provider_message.epm_password,
            epm_role : tempFieldSelected.error_provider_message.epm_role
        }
        if(!value) {
            tempAllFieldsSelected[index].errorProvider = errorProvider
            tempAllFieldsSelected[index].error_provider_message = error_provider_message
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setSettings(tempAllFieldsSelected)
        } else{
            tempAllFieldsSelected[index].errorProvider = errorProvider
            tempAllFieldsSelected[index].error_provider_message = error_provider_message
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setSettings(tempAllFieldsSelected)
        }
    }
    const handleSigninPassword = (event, index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = { ...tempAllFieldsSelected[index] }
        let value = event.currentTarget.value
        const fieldSettings = {
            username : tempFieldSelected.fieldSettings.username,
            password : value,
            userLogin : tempFieldSelected.fieldSettings.userLogin,
            role : tempFieldSelected.fieldSettings.role
        }
        const errorProvider = {
            error_username : tempFieldSelected.errorProvider.error_username,
            error_password : !value ? true : false,
            error_role : tempFieldSelected.errorProvider.error_role
        }
        const error_provider_message = {
            epm_username : tempFieldSelected.error_provider_message.epm_username,
            epm_password : !value ? 'Kindly provide your password' : '',
            epm_role : tempFieldSelected.error_provider_message.epm_role
        }
        if(!value) {
            tempAllFieldsSelected[index].errorProvider = errorProvider
            tempAllFieldsSelected[index].error_provider_message = error_provider_message
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setSettings(tempAllFieldsSelected)
        } else{
            tempAllFieldsSelected[index].errorProvider = errorProvider
            tempAllFieldsSelected[index].error_provider_message = error_provider_message
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setSettings(tempAllFieldsSelected)
        }
    }
    const handleSigninRole = (event, index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = { ...tempAllFieldsSelected[index] }
        let value = event.target.value
        const fieldSettings = {
            username : tempFieldSelected.fieldSettings.username,
            password : tempFieldSelected.fieldSettings.password,
            userLogin : tempFieldSelected.fieldSettings.userLogin,
            role : value
        }
        const errorProvider = {
            error_username : tempFieldSelected.errorProvider.error_username,
            error_password : tempFieldSelected.errorProvider.error_password,
            error_role : !value ? true : false
        }
        const error_provider_message = {
            epm_username : tempFieldSelected.error_provider_message.epm_username,
            epm_password : tempFieldSelected.error_provider_message.epm_password,
            epm_role : !value ? 'Kindly provide your password' : ''
        }
        if(!value) {
            tempAllFieldsSelected[index].errorProvider = errorProvider
            tempAllFieldsSelected[index].error_provider_message = error_provider_message
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setSettings(tempAllFieldsSelected)
        } else{
            tempAllFieldsSelected[index].errorProvider = errorProvider
            tempAllFieldsSelected[index].error_provider_message = error_provider_message
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setSettings(tempAllFieldsSelected)
        }
    }
    const handleSignin = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleCloseBackDropLoading = () => {
      setLoading(false)
    }
    const __home__ = (index) => {
        const tempAllFieldSelected = [...settings]
        const tempFieldSelected = {...tempAllFieldSelected[index]}
        const __key__ = localstorageHelper.load('key_identifier')
        if(__key__ == 'unknown') {}
        else{
            FormService.service_tokenization_scanned(__key__)
            .then(res => {
                if(__key__ == 'unknown') {
                    history.push(tempFieldSelected.router.Home)
                }else if(res.data.lastRoute == 'developer_platform') {
                    history.push(tempFieldSelected.router.login)
                }
                else if(res.data.lastRoute == '/developer/dashboard'){
                    history.push(tempFieldSelected.router.Dashboard)
                } else {
                    history.push(tempFieldSelected.router.Home)
                    // localstorageHelper.store('key_identifier', 'unknown1')
                }
            })
        }
        
    }

   const handleDevSignout = (index) => {
        setIsOpen(false)
        setLoading(true)
        const tempAllFieldSelected = [...settings]
        const tempFieldSelected = {...tempAllFieldSelected[index]}
        const router = {
            login : tempFieldSelected.fieldSettings.router.login
        }
        const fieldSettings = {
            signout_message : tempFieldSelected.fieldSettings.signout_message,
            key : localstorageHelper.load('keySaved')[0].uid,
            router : router
        }
        tempFieldSelected.fieldSettings = fieldSettings
        tempAllFieldSelected[index] = tempFieldSelected
        setSettings(tempAllFieldSelected)
        FormService.service_signout(tempFieldSelected.fieldSettings.key)
        .then(res => {
            if(res.data === 'SIGNOUT_SUCCESS'){
                setLoading(false)
                localstorageHelper.store('key_identifier', 'unknown')
                localstorageHelper.store('keySaved', 'unknown')
                history.push(tempFieldSelected.fieldSettings.router.login)
            }
        })
   }
   const navigateChooseDeveloper = () => {
       localstorageHelper.store('reg', 'dev')
       history.push(appRouter.Registration.path)
   }
   const createAccountNavigate = () => {
       setIsOpen(false)
       history.push(appRouter.Choosepage.path)
   }
   const devNext = (index) => {
        const tempAllFieldSelected = [...settings]
        const tempFieldSelected = {...tempAllFieldSelected[index]}
        const tempField = {...tempFieldSelected.fieldSettings}
        if(activeSteps == 0) {
            if(!tempField.personalInformation.firstname
                || !tempField.personalInformation.lastname) {

                    Toast.fire({
                        icon: 'error',
                        title: 'Some fields was empty.'
                    })
                    return false
                } else {
                    setActiveSteps((activeSteps) => activeSteps + 1)
                }
        } else if(activeSteps == 1) {
            //validation team info required
            setActiveSteps((activeSteps) => activeSteps + 1)
        }
        else  {
            if(!tempField.credentialsInformation.username
                || !tempField.credentialsInformation.password
                || !tempField.credentialsInformation.conpassword) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Some fields was empty.'
                    })
                    return false
                }
                else if(tempField.credentialsInformation.password != tempField.credentialsInformation.conpassword) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Password does not match.'
                    })
                    return false
                }
                else {
                    if(activeSteps === 2) {
                        setLoading(true)
                       FormService.service_checkdev(tempField.credentialsInformation.username)
                       .then(res => {
                            if(res.data === 'username_taken') {
                                Toast.fire({
                                    icon: 'info',
                                    title: 'Sorry but the username is already taken.'
                                })
                                setLoading(false)
                                return false
                            }else{
                                let newConstructFieldSettings = {
                                    personal : tempField.personalInformation,
                                    workInformation : tempField.workInformation,
                                    credentials : tempField.credentialsInformation
                                }
                                developer_account_creation_compressor(newConstructFieldSettings)
                                .then((snapshot) => {
                                    FormService.service_devcreate(snapshot)
                                    .then(res => {
                                        setLoading(false)
                                        if(res.data.message === 'dev_registration_success'){
                                            Toast.fire({
                                                icon: 'success',
                                                title: 'Success ! Kindly wait for administrators approval'
                                            })
                                            setLoading(false)
                                            //add step for done step
                                            setActiveSteps((activeSteps) => activeSteps + 1)
                                        }
                                    })
                                })
                            }
                       })
                    } else if(activeSteps === 3) {
                        setActiveSteps(0)
                        spielsClearing(
                            tempField.personalInformation,
                            tempField.workInformation,
                            tempField.credentialsInformation
                        )
                    }
                }

        }
   }
    return(
        <Context.Provider
        value={{
            handleNavigate, isLoading, Toast, settings, open,
            handleSigninUsername, handleSigninPassword,
            handleSigninRole, handleSigninProceed, handleSignin,
            handleClose, handleCloseBackDropLoading, __home__, initialRoute,
            handleChangeBranch, handleDevSignout, setIsOpen, navigateChooseDeveloper,
            activeSteps, setActiveSteps, createAccountNavigate, devNext
        }}
        >{children}</Context.Provider>
    )
}

export {FieldContext, Context}
