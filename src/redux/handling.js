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
    HTTPManualClient(object) {
        var data = new FormData()
        data.append('clientfname', object.clientfname)
        data.append('clientlname', object.clientlname)
        data.append('clientemail', object.clientemail)
        data.append('clientcontact', object.clientcontact)
        data.append('clientaddress', object.clientaddress)
        data.append('clientusername', object.clientusername)
        data.append('clientpassword', object.clientpassword)
        data.append('clientsecquestion', object.clientsecquestion)
        data.append('clientsecanswer', object.clientsecanswer)
        data.append('clientRegTrigger', object.clientTrigger)
        return data
    }
    HTTPLogin(object) {
        var data = new FormData()
        data.append('username', object.username)
        data.append('password', object.password)
        data.append('userLogin', object.userLogin)
        return data
    }
    HTTPCheckingClient(object) {
        var data = new FormData()
        data.append('clientusername', object.clientusername)
        data.append('clientpassword', object.clientpassword)
        data.append('clientTrigger', true)
        return data
    }
}

export default new DataHandling()