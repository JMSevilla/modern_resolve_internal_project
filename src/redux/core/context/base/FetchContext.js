import React, {createContext, useEffect, useRef, useState, useContext} from 'react'
import Spiels from '../../data/Spiels'
import { useDispatch, useSelector } from 'react-redux'
import { get_request_userlist } from '../../fetchSlice'
import FormService from '../../../Utilization'

const HandleFetchContext = createContext()

const HandleFetch = ( { children } ) => {
    
    const dispatch = useDispatch()
    const [allFieldsSelected, setAllFieldsSelected] = useState(Spiels.fields)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [userlist] = useSelector((state) => [
        state.fetching.userlist
    ])
    const userRef = useRef(userlist)
    useEffect(() => {
        userRef.current = userlist
    }, [userlist])
    const GET_USERLIST = (index) => {
        const tempAllFieldsSelected = [...allFieldsSelected]
        FormService.service_dev_getallusers().then(res => {
            console.log(res.data)
            const fieldSettings = {
                userlist : res.data
            }
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setAllFieldsSelected(tempAllFieldsSelected)
        })
    }
    const editTransferContextData = (object, selectedIndex) => {
        const tempAllFieldsSelected = [...allFieldsSelected]
        const tempFieldsSelected = {...tempAllFieldsSelected[selectedIndex]}
        const newusersObj = {
            id : object.id,
            firstname : object.firstname,
            lastname : object.lastname,
            username : object.username,
            password : object.password
        }
        const fieldSettings = {
            usersObj : newusersObj,
            errorProvider : tempFieldsSelected.fieldSettings.errorProvider,
            error_provider_message : tempFieldsSelected.fieldSettings.error_provider_message
        }
        setSelectedIndex(selectedIndex)
        tempFieldsSelected.fieldSettings = fieldSettings
        tempAllFieldsSelected[selectedIndex] = tempFieldsSelected
        setAllFieldsSelected(tempAllFieldsSelected)
    }
    return(
        <HandleFetchContext.Provider
        value={{
            GET_USERLIST, allFieldsSelected, editTransferContextData,
            selectedIndex, setSelectedIndex
        }}
        >{children}</HandleFetchContext.Provider>
    )
}

export { HandleFetch, HandleFetchContext }