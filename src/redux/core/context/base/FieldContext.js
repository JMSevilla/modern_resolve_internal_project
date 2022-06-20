import React, {createContext, useState} from 'react'
import Spiels from '../../data/Spiels'

const HandleFieldContext = createContext()

const HandlesContext = ({children}) => {
    const [allFieldSelected, setAllFieldSelected] = useState(Spiels.fields)
    const handleFirstname = (event, index) => { 
        let value = event.currentTarget.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : value,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : !value ? true : false,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : !value ? 'Kindly provide firstname' : '',
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }
    const handleLastname = (event, index) => { 
        let value = event.currentTarget.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : value
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : !value ? true : false,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : !value ? 'Kindly provide lastname' : '',
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }

    const handleUsername = (event, index) => {
        let value = event.currentTarget.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : value,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : !value ? true : false,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : !value ? 'Kindly provide username' : '',
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }
    const handlePassword = (event, index) => {
        let value = event.currentTarget.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : value,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : !value ? true : false,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : !value ? 'Kindly provide password' : '',
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }
    const handleConfirmPassword = (event, index) => {
        let value = event.currentTarget.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : value
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : !value ? true : value !== tempField.credentialsInformation.password ? true : false
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : !value ? 'Kindly confirm your password' : value !== tempField.credentialsInformation.password ? 'Password does not match' : ''
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }
    const handleOccupationType = (event, index) => {
        let value = event.target.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : value,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }

    }
    const handlePositionSelection = (event, index) => {
        
        const {
            target: { value },
          } = event;
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : typeof value === 'string' ? value.split(',') : value,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }
    const handleStudy = (event, index) => {
        let value = event.currentTarget.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : value,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }
    }
    const handleDegree = (event, index) => {
        let value = event.target.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : value,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }

    }

    const handleAddress = (event, index) => {
        let value = event.target.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : tempField.workInformation.occupationDetails,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : value
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }

    }
    const handleOccupationReason = (event, index) => {
        let value = event.target.value
        const tempAllFieldSelected = [...allFieldSelected]
        const tempFieldSelected = { ...tempAllFieldSelected[index] }
        const tempField = {...tempFieldSelected.fieldSettings}
        const personalInformation = { 
            firstname : tempField.personalInformation.firstname,
            lastname : tempField.personalInformation.lastname
        }
        const workInformation = { 
            occupationStatus : tempField.workInformation.occupationStatus,
            occupationDetails : value,
            occupationPositionWork : tempField.workInformation.occupationPositionWork,
            nameofschool : tempField.workInformation.nameofschool,
            degree : tempField.workInformation.degree,
            address : tempField.workInformation.address
        }
        const credentialsInformation = { 
            username : tempField.credentialsInformation.username,
            password : tempField.credentialsInformation.password,
            conpassword : tempField.credentialsInformation.conpassword
        }
        const errorProvider = { 
            error_firstname : tempField.errorProvider.error_firstname,
            error_lastname : tempField.errorProvider.error_lastname,
            error_username : tempField.errorProvider.error_username,
            error_password : tempField.errorProvider.error_password,
            error_conpassword : tempField.errorProvider.error_conpassword
        }
        const error_provider_message = { 
            epm_firstname : tempField.error_provider_message.epm_firstname,
            epm_lastname : tempField.error_provider_message.epm_lastname,
            epm_username : tempField.error_provider_message.epm_username,
            epm_password : tempField.error_provider_message.epm_password,
            epm_conpassword : tempField.error_provider_message.epm_conpassword
        }
        const fieldSettings = {
            personalInformation : personalInformation,
            workInformation : workInformation,
            credentialsInformation : credentialsInformation,
            errorProvider : errorProvider,
            error_provider_message : error_provider_message
        }
        if(!value) {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        } else {
            tempAllFieldSelected[index].fieldSettings = fieldSettings
            setAllFieldSelected(tempAllFieldSelected)
        }

    }
    return (
        <HandleFieldContext.Provider
        value={{
            handleFirstname, handleLastname, allFieldSelected, handleUsername,
            handlePassword, handleConfirmPassword, handleOccupationType,
            handlePositionSelection, handleStudy, handleDegree, handleAddress,
            handleOccupationReason
        }}
        >{children}</HandleFieldContext.Provider>
    )
}

export { HandleFieldContext, HandlesContext }