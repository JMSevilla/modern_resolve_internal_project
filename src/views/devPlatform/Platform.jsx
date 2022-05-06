import React, {useRef, useEffect} from 'react'
import DevNavbar from '../../components/devNavbar/Navbar'
import imgDev from '../../assets/origlogo.png'
import {useSelector, useDispatch} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { authIdentify } from '../../redux/core/loginSlice'
import { appRouter } from '../../router/route'
import { useHistory } from 'react-router-dom'

const platforms = [
    {
        id : 1,
        img : 'https://cdn.dribbble.com/users/1068771/screenshots/14247776/media/fbf5f8ae629e3a6248006e748ddd6b67.jpg?compress=1&resize=1200x900&vertical=top',
        title : 'Developer Dashboard',
        Description : 'The Developer Dashboard serves as the central control center from which a developer can manage settings, Users, or Data, as well as view analytics.'
    },
    {
        id : 2,
        img : 'https://cdn.dribbble.com/users/1068771/screenshots/14247776/media/fbf5f8ae629e3a6248006e748ddd6b67.jpg?compress=1&resize=1200x900&vertical=top',
        title : 'Developer Dashboard',
        Description : 'The Developer Dashboard serves as the central control center from which a developer can manage settings, Users, or Data, as well as view analytics.'
    },
    {
        id : 3,
        img : 'https://cdn.dribbble.com/users/1068771/screenshots/14247776/media/fbf5f8ae629e3a6248006e748ddd6b67.jpg?compress=1&resize=1200x900&vertical=top',
        title : 'Developer Dashboard',
        Description : 'The Developer Dashboard serves as the central control center from which a developer can manage settings, Users, or Data, as well as view analytics.'
    },
    {
        id : 4,
        img : 'https://cdn.dribbble.com/users/1068771/screenshots/14247776/media/fbf5f8ae629e3a6248006e748ddd6b67.jpg?compress=1&resize=1200x900&vertical=top',
        title : 'Developer Dashboard',
        Description : 'The Developer Dashboard serves as the central control center from which a developer can manage settings, Users, or Data, as well as view analytics.'
    },
    {
        id : 5,
        img : 'https://cdn.dribbble.com/users/1068771/screenshots/14247776/media/fbf5f8ae629e3a6248006e748ddd6b67.jpg?compress=1&resize=1200x900&vertical=top',
        title : 'Developer Dashboard',
        Description : 'The Developer Dashboard serves as the central control center from which a developer can manage settings, Users, or Data, as well as view analytics.'
    },
]

const pageNumbers = []
const DEVPlatform = () => {
    const [savedInfo, initialRoute] = useSelector((state) => [
        state.login.savedInfo, state.login.initialRoute
    ])
    const refResponse = useRef(initialRoute)
    const [currentPage, setPage] = React.useState(1);
    const [dataperPage, setdataperPage] = React.useState(5);
    const refSavedInfo = useRef(savedInfo)
    const [keyIdentifier, setkeyIdentifier] = React.useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const indexData = currentPage * dataperPage
    const indexFirstData = indexData - dataperPage
    const currentDataPage = platforms.slice(indexFirstData, indexData)

    for(let i = 1; i <= Math.ceil(platforms.length / dataperPage); i++) {
        pageNumbers.push(i)
    }
    useEffect(() => {
        setkeyIdentifier(JSON.parse(localStorage.getItem('keySaved'))[0].uid)
        if(localStorage.getItem('key_identifier') == 'unknown'){
            
        }else{ 
             dispatch(authIdentify(localStorage.getItem('key_identifier')))
        }
        refResponse.current = initialRoute
        setTimeout(() => {
            if(refResponse.current === undefined || refResponse.current === null) {
                
            } else if(refResponse.current[0].key.key === 'token_exist_dev_platform') { 
                //retain dev here in platform
            } else {
                history.push({pathname: appRouter.Homepage.path})
            }
        }, 1000)
    }, [initialRoute])
    useEffect(() => {
        refSavedInfo.current = savedInfo
        
    }, [savedInfo])
    const handleChangePage = (event, value) => {
        setPage(value);
      };
    return(
        <>
            <DevNavbar />
            <center>
                <img 
                src={imgDev} 
                alt="Modern Resolve"
                style={{width: '20%', height: 'auto'}}
                className="img-fluid" />
                <h3>Welcome to developer portal {JSON.parse(localStorage.getItem('keySaved'))[0].fname + " " + JSON.parse(localStorage.getItem('keySaved'))[0].lname}</h3>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                    <div className="card card-body">
                    <p>Currently logged in as :</p><h5>{JSON.parse(localStorage.getItem('keySaved'))[0].role}</h5>
                </div>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </center>
            <hr />
            <div style={{ marginBottom: '60px', marginTop: '100px'}} className="container">
                    <div className="row">   
                {
                    currentDataPage.map((i) => {
                        return(
                            
                                    <div className="col-sm">
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={i.img}
                                            alt="developer dahboard"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            {i.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {i.Description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" style={{width: '100%'}} size="small">SELECT</Button>
                                        </CardActions>
                                    </Card>
                                    </div>
                            
                        )
                    })
                }
            </div>
                <div style={{marginTop: '20px'}}>
                    <Pagination count={pageNumbers} page={currentPage} onChange={handleChangePage} />
                </div>
            </div>
        </>
    )
}

export default DEVPlatform