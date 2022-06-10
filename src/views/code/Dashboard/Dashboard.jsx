import React, {useEffect, useState, useRef, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authIdentify } from '../../../redux/core/loginSlice';
import { appRouter } from '../../../router/route';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Context } from '../../../redux/core/context/context';

const cardsArray = [
    {
        cardID : 1,
        cardTitle : 'Users',
        total : 0,
    },
    {
        cardID : 2,
        cardTitle : 'Clients',
        total : 0,
    },
    {
        cardID : 3,
        cardTitle : 'Request Proposals',
        total : 0,
    },
    {
        cardID : 4,
        cardTitle : 'Active developers',
        total : 0,
    },
]

const DashboardExile = () => {
    const contextValues = useContext(Context)
    const {__home__, initialRoute} = contextValues
    useEffect(() => {
        __home__(1)
    } ,[])
    const basicCard = () => {
        return(
            <>
            {
                cardsArray.map((i) => {
                    return(
                        <div className="col-sm">
                            <Card sx={{minWidth: 275}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {i.cardTitle}
                            </Typography>
                            <Typography variant="h5" component="div">
                            {i.total}
                            </Typography>
                            </CardContent>
                        </Card>
                        </div>
                    )
                })
            }
            </>
        )
    }
    return(
        <>
            <div className='container' style={{marginTop: '100px'}}>
                <div style={{marginBottom : '50px'}}>
                    <h3>Developer Dashboard</h3>
                    <p>A dashboard is a visual display of all of your data. While it can be used in all kinds of different ways, its primary intention is to provide information.</p>
                </div>
                <div className="row">
                    {basicCard()}
                </div>
            </div>   
        </>
    )
}


export default DashboardExile