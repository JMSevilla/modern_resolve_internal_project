var data = new FormData()
class DataHandling {
    HTTPHandling(object) {
        
        for(const props in object){
            data.append(`${props}`, `${object[props]}`)
        }
        
        return data
    }
    HTTPManual(object) {
        
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
      
        data.append('username', object.username)
        data.append('password', object.password)
        data.append('userLogin', object.userLogin)
        data.append('role', object.role)
        return data
    }
    HTTPTokenIdentify(value) {
       
        data.append('tokenstate', true)
        data.append('token', value)
        return data
    }
    HTTPSignout(id){
        data.append('signoutState', true)
        data.append('userid', id)
        return data
    }
}

export default new DataHandling()