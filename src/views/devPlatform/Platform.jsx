import React, {useRef, useEffect, useState, useContext} from 'react'
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
import { getBranches } from '../../redux/core/branchSlice';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Context } from '../../redux/core/context/context';


const pageNumbers = []
const DEVPlatform = () => {
    const contextValues = useContext(Context)
    const { handleNavigate, isLoading, __home__, initialRoute } = contextValues
    
    const [arrBranch, setBranchArray] = useState([])
    const [savedInfo, branchList] = useSelector((state) => [
        state.login.savedInfo,
          state.branch.branchList
    ])
    const branchReference = useRef(arrBranch)
    useEffect(() => {
        branchReference.current = arrBranch
    }, [arrBranch])
    const branchRef = useRef(branchList)
    const [currentPage, setPage] = React.useState(1);
    const [dataperPage, setdataperPage] = React.useState(5);
    const refSavedInfo = useRef(savedInfo)
    const dispatch = useDispatch()
    const indexData = currentPage * dataperPage
    const indexFirstData = indexData - dataperPage
    const currentDataPage = branchList.slice(indexFirstData, indexData)

    for(let i = 1; i <= Math.ceil(branchReference.current.length / dataperPage); i++) {
        pageNumbers.push(i)
    }
    useEffect(() => {
        dispatch(getBranches())
        branchRef.current = branchList
        
        refSavedInfo.current = savedInfo
    }, [])

    useEffect(() => {
        __home__(1)
    }, [])
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
                                            image={i.branchImg}
                                            alt="developer dahboard"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            {i.branchName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {i.branchDescription}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => handleNavigate(i.branchRoute, 0)} variant="contained" style={{width: '100%'}} size="small">SELECT</Button>
                                        </CardActions>
                                    </Card>
                                    </div>
                            
                        )
                    })
                }
                <Backdrop
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      open={isLoading}
                                    >
                                      <CircularProgress color="inherit" />
                                    </Backdrop>
            </div>
                <div style={{marginTop: '20px'}}>
                    <Pagination count={pageNumbers} page={currentPage} onChange={handleChangePage} />
                </div>
            </div>
        </>
    )
}

export default DEVPlatform