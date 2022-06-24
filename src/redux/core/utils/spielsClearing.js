

export const spielsClearing = 
(personalObject, workObject, credentialsObject) => {
    Object.keys(personalObject).forEach(key => {
        delete personalObject[key]
    })
    delete workObject.occupationStatus
    delete workObject.occupationDetails
    workObject.occupationPositionWork = []
    delete workObject.nameofschool
    delete workObject.degree
    delete workObject.address
    Object.keys(credentialsObject).forEach(key => {
        delete credentialsObject[key]
    })
}