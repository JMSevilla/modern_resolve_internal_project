import React, {useContext} from 'react'
import {
    Container,
    CardContent,
    CardActions, AppBar,
    Toolbar, Typography,
    Button, Grid, CardHeader, IconButton,
    
} from '@mui/material'
import AppCard from '../components/Card/Card'
import Avatar from '@mui/material/Avatar';
import { red, blue } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useHistory} from 'react-router-dom'
import { Context } from '../redux/core/context/context';


const ChooseNavigation = () => (
    <React.Fragment>
         <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Choose Registration Type
          </Typography>
          <Button color="inherit">BACK</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
)

const ChooseContent = () => {
    return(
        <React.Fragment>
            <CardContent>
                <Typography variant="h6" gutterBottom component="div">
                        Platform Account Creation
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                        Kindly choose what kind of registration you need
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <AppCard  children={<ChooseDeveloperContent />} />
                    </Grid>
                    <Grid item xs={6}>
                        <AppCard  children={<ChooseClientContent />} />
                    </Grid>
                </Grid>
            </CardContent>
        </React.Fragment>
    )
}
const ChooseClientContent = () => {
    return (
        <React.Fragment>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    C
                </Avatar>
                }
                title="Client"
                subheader="Create an account as a client."
                action={
                    <IconButton style={{marginTop: '10px'}} aria-label="settings">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  }
            />

        </React.Fragment>
    )
}
const ChooseDeveloperContent = () => {
    const contextValues = useContext(Context)
    const {navigateChooseDeveloper} = contextValues
    return (
        <React.Fragment>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    D
                </Avatar>
                }
                title="Developer"
                subheader="Create an account as a developer."
                action={
                    <IconButton onClick={() => navigateChooseDeveloper()} style={{marginTop: '10px'}} aria-label="settings">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  }
            />

        </React.Fragment>
    )
}

const Choose = () => {
   
    return (
        <React.Fragment>
            <ChooseNavigation />
            <Container style={{marginTop: '170px'}} fixed>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={5}>
                        <img 
                        src="https://cdn.dribbble.com/userupload/2642094/file/original-3695949a32a8ef22b9e9d6c620f16ce3.jpg?compress=1&resize=1200x900"
                        className='img-fluid'
                        style={{width: '100%', height: 'auto'}}
                        alt='content'
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <AppCard children={<ChooseContent />} />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Choose