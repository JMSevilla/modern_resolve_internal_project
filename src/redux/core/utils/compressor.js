

export const developer_account_creation_compressor = (newObject) => {
    return new Promise((resolve) => {
        let newConstructFieldObjects = newObject
        let constructObject
        if(Object.keys(newConstructFieldObjects).length === 0) {
            return false
        }
        constructObject = { 
            fname : newConstructFieldObjects.personal.firstname,
            lname : newConstructFieldObjects.personal.lastname,
            occupationStatus : newConstructFieldObjects.workInformation.occupationStatus,
            occupationDetails : newConstructFieldObjects.workInformation.occupationDetails,
            occupationPositionWork : JSON.stringify(newConstructFieldObjects.workInformation.occupationPositionWork),
            nameOfSchool : newConstructFieldObjects.workInformation.nameofschool,
            degree : newConstructFieldObjects.workInformation.degree,
            address : newConstructFieldObjects.workInformation.address,
            username : newConstructFieldObjects.credentials.username,
            password : newConstructFieldObjects.credentials.password,
        }
        return resolve(constructObject)
    })
}