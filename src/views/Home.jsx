import React, {useEffect, useContext, useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import CarouseApp from '../components/Carousel/Carousel'
import { Context } from '../redux/core/context/context'
import {Container, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Grid, Card, CardContent} from '@mui/material'

import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { coreMembers, reserveMembers } from '../redux/core/utils/helper'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ViewDevelopers = ({open, handleClose}) => {
    return (
        <React.Fragment>
            <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor : '#121212'}} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Meet the core developers of Modern Resolve Organization
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
            <Container fixed style={{marginTop: '80px'}}>
            <Typography variant="h6" style={{marginBottom: '20px'}} gutterBottom component="div">
                                                    Core Developers
                                            </Typography>
            <hr/>
                <Grid style={{marginBottom: '25px'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    
                    {
                        coreMembers && coreMembers.map((item) => {
                            return(
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                           <center>
                                           {item.avatar} 
                                            <Typography variant="h6" style={{marginBottom: '20px'}} gutterBottom component="div">
                                                    {item.name}
                                            </Typography>
                                            
                                           </center>
                                           <Typography variant="subtitle2" gutterBottom component="div">
                                                Occupation : {item.occupation}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Company : {item.company}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Current MDR Role : {item.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Typography variant="h6" style={{marginBottom: '20px'}} gutterBottom component="div">
                                                    Reserved Developers
                                            </Typography>
            <hr/>
            <Grid style={{marginBottom: '25px'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    
                    {
                        reserveMembers && reserveMembers.map((item) => {
                            return(
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                           <center>
                                           {item.avatar} 
                                            <Typography variant="h6" style={{marginBottom: '20px'}} gutterBottom component="div">
                                                    {item.name}
                                            </Typography>
                                            
                                           </center>
                                           <Typography variant="subtitle2" gutterBottom component="div">
                                                Occupation : {item.occupation}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Company : {item.company}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Current MDR Role : {item.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Typography variant="h6" style={{marginBottom: '20px'}} gutterBottom component="div">
                                                    System Documentations and Solutions Architects
                                            </Typography>
            <hr/>
            </Container>
      </Dialog>
        </React.Fragment>
    )
}

const HomeApp = () => {
    const contextValues = useContext(Context)
    const {__home__} = contextValues
    useEffect(() => {
        __home__(1)
    } ,[])
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    return(
        <div>
            <Navbar />
            <Container style={{marginTop: '100px'}} fixed>
                <center>
                    <img src="https://cdn.dribbble.com/users/1791775/screenshots/6832881/___.gif" alt="mdr robot"
                    className='img-fluid' style={{width: '50%', height: 'auto'}} />
                    <Typography variant="h6" gutterBottom component="div">
                       UNDER CONSTRUCTION
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                        We're making lots of improvements and will be back soon.
                </Typography>
                <Button variant="contained" color="success">
                        Get Notified
                    </Button> &nbsp;
                    <Button onClick={() => setOpen(true)} variant="contained">
                        View the developers
                    </Button>
                    <ViewDevelopers open={open} handleClose={handleClose} />
                </center>
            </Container>
        </div>
    )
}

export default HomeApp