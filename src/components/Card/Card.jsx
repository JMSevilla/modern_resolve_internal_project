import React from 'react'
import { Card } from '@mui/material'


const AppCard = ({children}) => {
    return(
        <React.Fragment>
            <Card style={{padding: '15px', marginTop: '50px'}}>
                {children}
            </Card>
        </React.Fragment>
    )
}

export default AppCard