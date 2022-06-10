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
    
    const [branchMessage, token, initialRoute, signoutMessage] = useSelector((state) => [
        state.branch.branchMessage,
        state.login.token,
        state.login.initialRoute,
        state.signout.signoutMessage
    ])
    const signoutref = useRef(signoutMessage)
    const scanned = useRef(initialRoute)
    const fieldRef = useRef(branchMessage)
    const signinReference = useRef(token)
    const dispatch = useDispatch()
    const history = useHistory()
    /* use Effects */
    useEffect(() => {
        fieldRef.current = branchMessage
        signinReference.current = token
        signoutref.current = signoutMessage
    },[branchMessage, token, signoutMessage])
    useEffect(() => {
        scanned.current = initialRoute
    }, [initialRoute])
    /* end use Effects */
    const handleNavigate = (route, index) => {
        const tempAllFieldsSelected = [...settings]
        const tempFieldSelected = {...tempAllFieldsSelected[index]}
        if(route == '/developer/dashboard') {
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
                    history.push(tempFieldSelected.fieldSettings.registeredRoute)
                    setLoading(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully navigate to developer dashboard.'
                    })
                }
            }, 1000)
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
            dispatch(pushLogin(tempFieldSelected.fieldSettings))
            setTimeout(() => {
                const message = signinReference.current[0].key.message == undefined || signinReference.current[0].key.message == null ? signinReference.current[0].key : signinReference.current[0].key.message
                switch(true){
                    case message == 'success_developer' : {
                        Toast.fire({
                            icon: 'success',
                            title: 'Successfully logged in.'
                        })
                        setLoading(false)
                        const key = signinReference.current[0].key.uid
                        localstorageHelper.store('key_identifier', key)
                        tempFieldSelected.message = message
                        setSettings(tempAllFieldsSelected)
                        history.push(tempFieldSelected.router.login)
                    }
                    case message == 'ACCOUNT_NOT_FOUND' : {
                        Toast.fire({
                            icon: 'error',
                            title: 'Sorry, but the account was not found.'
                        })
                        setLoading(false)
                    }
                    case message == 'PASSWORD_INVALID' : {
                        Toast.fire({
                            icon: 'error',
                            title: 'The username or password you have entered is wrong.'
                        })
                        setLoading(false)
                    }
                }
            }, 1000)
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
            dispatch(authIdentify(__key__))
        }
        setTimeout(() => {
            if(__key__ == 'unknown') {
                history.push(tempFieldSelected.router.Home)
                localstorageHelper.store('key_identifier', 'unknown1')
            }
            else if(scanned.current[0].key.lastroute == 'developer_platform') {
                history.push(tempFieldSelected.router.login)
            }
            else if(scanned.current[0].key.lastroute == '/developer/dashboard'){
                history.push(tempFieldSelected.router.Dashboard)
            } else { 
                history.push(tempFieldSelected.router.Home)
                localstorageHelper.store('key_identifier', 'unknown1')
            }
        },1000)
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
        dispatch(pushSignout(tempFieldSelected.fieldSettings.key))
        setTimeout(() => {
            if(signoutref.current[0].key === 'SIGNOUT_SUCCESS'){
                setLoading(false)
                localstorageHelper.store('key_identifier', 'unknown')
                localstorageHelper.store('keySaved', 'unknown')
                history.push(tempFieldSelected.fieldSettings.router.login)
            }
        }, 1000)
   }
    return(
        <Context.Provider
        value={{
            handleNavigate, isLoading, Toast, settings, open,
            handleSigninUsername, handleSigninPassword, 
            handleSigninRole, handleSigninProceed, handleSignin,
            handleClose, handleCloseBackDropLoading, __home__, initialRoute,
            handleChangeBranch, handleDevSignout, setIsOpen
        }}
        >{children}</Context.Provider>
    )
}

export {FieldContext, Context}