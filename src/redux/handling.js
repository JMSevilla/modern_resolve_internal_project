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
    HTTPManualClient(object) {
        
        data.append('clientfname', object.clientfname)
        data.append('clientlname', object.clientlname)
        data.append('clientemail', object.clientemail)
        data.append('clientcontact', object.clientcontact)
        data.append('clientaddress', object.clientaddress)
        data.append('clientusername', object.clientusername)
        data.append('clientpassword', object.clientpassword)
        data.append('clientsecquestion', object.clientsecquestion)
        data.append('clientsecanswer', object.clientsecanswer)
        data.append('clientRegTrigger', true)
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
    HTTPBranch(value) {
        data.append('platformState', value)
        return data
    }
    HTTPTokenupdater(object) {
        data.append('routeState', true)
        data.append('route', object.route)
        data.append('id', object.id)
        return data
    }
}

export default new DataHandling()