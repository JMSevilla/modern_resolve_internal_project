import React, {createContext, useEffect, useRef, useState, useContext} from 'react'
import Spiels from '../../data/Spiels'
import { useDispatch, useSelector } from 'react-redux'
import { get_request_userlist } from '../../fetchSlice'

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

        let obj = {trigger : true}
        dispatch(get_request_userlist(obj))
        setTimeout(() => {
            const fieldSettings = {
                userlist : userRef.current
            }
            tempAllFieldsSelected[index].fieldSettings = fieldSettings
            setAllFieldsSelected(tempAllFieldsSelected)
        },1000)
    }
    const editTransferContextData = (object, selectedIndex) => {
        const tempAllFieldsSelected = [...allFieldsSelected]
        const tempFieldsSelected = {...tempAllFieldsSelected[selectedIndex]}
        const newusersObj = {
            id : object.id,
            firstname : object.firstname,
            lastname : object.lastname
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