import React from 'react'
import {appRouter} from '../../../router/route'
class Spiels {
    fields = [
        {
            field_id : 1,
            fieldSettings : {
                ResponseMessage : '',
                registeredRoute : '',
            }
        },
        {
            field_id : 2,
            message : '',
            router : {
                login : appRouter.devPlatform.path,
                Dashboard : appRouter.DashboardOverview.path,
                Home : appRouter.Homepage.path
            },
            fieldSettings : {
                username : '',
                password : '',
                userLogin : false,
                role : ''
            },
            errorProvider : {
                error_username : false,
                error_password : false,
                error_role : false
            },
            error_provider_message : {
                epm_username : '',
                epm_password : '',
                epm_role : ''
            }
        },
        {
            field_id : 3,
            fieldSettings : {
                signout_message : '',
                key : '',
                router : {
                    login : appRouter.Homepage.path
                }
            }
        },
        {
            field_id : 4,
            fieldSettings : {
                personalInformation : {
                    firstname : '',
                    lastname : ''
                },
                workInformation : {
                    occupationStatus : '',
                    occupationDetails : '',
                    occupationPositionWork : [],
                    nameofschool : '',
                    degree : '',
                    address : ''
                },
                credentialsInformation : {
                    username : '',
                    password : '',
                    conpassword : ''
                },
                errorProvider : {
                    error_firstname : false,
                    error_lastname : false,
                    error_username : false,
                    error_password : false,
                    error_conpassword : false
                },
                error_provider_message : {
                    epm_firstname : '',
                    epm_lastname : '',
                    epm_username : '',
                    epm_password : '',
                    epm_conpassword : ''
                }
            }
        }
    ]
}

export default new Spiels()