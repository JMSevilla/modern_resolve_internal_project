import React, {useRef, useEffect, useState} from 'react'
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
import { getBranches, pushTokenRouteUpdate } from '../../redux/core/branchSlice';
import Swal from 'sweetalert2'



const pageNumbers = []
const DEVPlatform = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    const [arrBranch, setBranchArray] = useState([])
    const [savedInfo, initialRoute, branchList, branchMessage] = useSelector((state) => [
        state.login.savedInfo,
         state.login.initialRoute,
          state.branch.branchList,
          state.branch.branchMessage
    ])
    const [branchtokenUpdater, setBranchUpdater] = useState(
        {
            obj : {
                route : null,
                id : null
            }
        }
    )
    const branchrouteUpdaterRef = useRef(branchMessage)
    const branchRef = useRef(branchList)
    const refResponse = useRef(initialRoute)
    const [currentPage, setPage] = React.useState(1);
    const [dataperPage, setdataperPage] = React.useState(5);
    const refSavedInfo = useRef(savedInfo)
    const [keyIdentifier, setkeyIdentifier] = React.useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const indexData = currentPage * dataperPage
    const indexFirstData = indexData - dataperPage
    const currentDataPage = arrBranch.slice(indexFirstData, indexData)

    for(let i = 1; i <= Math.ceil(arrBranch.length / dataperPage); i++) {
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
    }, [])
    useEffect(() => {
        branchrouteUpdaterRef.current = branchMessage
    }, [branchMessage])
    useEffect(() => {
        async function getchBranch(){
            await dispatch(getBranches(true))
        }
        getchBranch()
        branchRef.current = branchList
        setBranchArray(branchRef.current)
    },[branchList])

    useEffect(() => {
        refSavedInfo.current = savedInfo
        
    }, [])
    const handleChangePage = (event, value) => {
        setPage(value);
      };
    const handleNavigate = (route) => {
        if(route === '/developer/dashboard') {
            const uid = localStorage.getItem('key_identifier')
            setBranchUpdater(prevState => {
                let obj = Object.assign({}, prevState.obj)
                obj.route = "developer_dashboard"
                obj.id = uid
                return {obj}
            })
            dispatch(pushTokenRouteUpdate(branchtokenUpdater))
            setTimeout(() => {
                if(branchrouteUpdaterRef.current[0].key === 'route_updated'){
                    history.push(route)
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully navigate to developer dashboard.'
                      })
                }
            }, 2000)
        }
    }
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
                                            <Button onClick={() => handleNavigate(i.branchRoute)} variant="contained" style={{width: '100%'}} size="small">SELECT</Button>
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