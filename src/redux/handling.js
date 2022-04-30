class DataHandling {
    HTTPHandling(object) {
        var data = new FormData()
        for(const props in object){
            data.append(`${props}`, `${object[props]}`)
        }
        
        return data
    }
    HTTPManual(object) {
        var data = new FormData()
        data.append('fname', object.fname)
        data.append('lname', object.lname)
        data.append('occupationStatus', object.occupationStatus)
        data.append('occupationDetails', object.occupationDetails)
        data.append('occupationPositionWork', object.occupationPositionWork)
        data.append('nameOfSchool', object.nameOfSchool)
        data.append('degree', object.degree)
        data.append('address', object.address)
        data.append('username', object.username)
        data.append('password', object.password)
        data.append('regTrigger', true)
        return data
    }
    HTTPLogin(object) {
        var data = new FormData()
        data.append('username', object.username)
        data.append('password', object.password)
        data.append('userLogin', object.userLogin)
        return data
    }
}

export default new DataHandling()