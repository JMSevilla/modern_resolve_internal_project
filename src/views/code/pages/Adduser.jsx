import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicTable from '../../../components/Table/Table';
const AddUser = () => {
    const testChildren = () => {
        return(
            <>
                <p>Test</p>
            </>
        )
    }
    return(
        <>
            <div className='container' style={{marginTop: '100px'}}>
            <div style={{marginBottom : '50px'}}>
                    <h3>User Management</h3>
                    <p>You can manage all users and access here .</p>
            </div>
            <Card style={{width: '100%'}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                User Management
                            </Typography>
                            {BasicTable()}
                            </CardContent>
            </Card>
            </div>
        </>
    )
}

export default AddUser