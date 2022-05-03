import React from 'react'
import DevNavbar from '../../components/devNavbar/Navbar'
import imgDev from '../../assets/origlogo.png'
import {useSelector} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const DEVPlatform = () => {
    const [savedInfo] = useSelector((state) => [
        state.login.savedInfo
    ])
    console.log(savedInfo)
    const DeveloperPortal = () => {
        return(
            <>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://cdn.dribbble.com/users/1068771/screenshots/14247776/media/fbf5f8ae629e3a6248006e748ddd6b67.jpg?compress=1&resize=1200x900&vertical=top"
                        alt="developer dahboard"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Developer Dashboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        The Developer Dashboard serves as the central control center from which a developer can manage settings, Users, or Data, as well as view analytics.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" style={{width: '100%'}} size="small">SELECT</Button>
                    </CardActions>
                    </Card>
            </>
        )
    }
    return(
        <>
            <DevNavbar />
            
            <div style={{ marginBottom: '60px', marginTop: '100px'}} className="container">
            <div className="row">
                    <div className="col-sm">
                        {DeveloperPortal()}
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                </div>
            </div>
        </>
    )
}

export default DEVPlatform