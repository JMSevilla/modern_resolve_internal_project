import React, {useEffect, useState, useRef} from 'react'
import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import MUIDialog from '../../Dialog/Dialog'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import { pushSignout } from '../../../redux/core/signoutSlice'
import { appRouter } from '../../../router/route'
import { useHistory } from 'react-router-dom'
import { pushTokenRouteUpdate } from '../../../redux/core/branchSlice'
import Swal from 'sweetalert2'

const AdminNavigation = () => {
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
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [trackDispatch, setTrack] = useState(false)
    const [
        signoutMessage, branchMessage
    ] = useSelector((state) => [state.signout.signoutMessage, state.branch.branchMessage])
    const signoutref = useRef(signoutMessage)
    const trackref = useRef(trackDispatch)
    const [keyIdentifier, setkeyIdentifier] = React.useState('')
    const togglenav = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
               localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
    const branchrouteUpdaterRef = useRef(branchMessage)
    useEffect(() => {
        signoutref.current = signoutMessage
        trackref.current = trackDispatch
        setkeyIdentifier(JSON.parse(localStorage.getItem('keySaved'))[0].uid)
        branchrouteUpdaterRef.current = branchMessage
    }, [signoutMessage, trackDispatch, branchMessage])
    const handleSignout = () => {
        setOpen(true)
    }
    const handleAgree = () => {
        setOpen(false)
        setIsLoading(true)
        setTrack(true)
        const key = keyIdentifier
        setTimeout(() => {
            if(trackref.current) {
                dispatch(pushSignout(key))
            } else {}
        }, 2000)
        setTimeout(() => {
            
            if(trackref.current) {
                if(signoutref.current[0].key === 'SIGNOUT_SUCCESS' || signoutref.current[0].key === undefined){
                    setTrack(false)
                    history.push(appRouter.Homepage.path)
                    localStorage.setItem('key_identifier', 'unknown');
                    localStorage.setItem('keySaved', 'unknown');
                    
            } else {
                setIsLoading(false)
            }
            }else{

            }
        }, 3000)
    }
    const handlecancel = () => {
        setOpen(false)
    }
    const handleChangeBranch = () => {
        setIsLoading(true)
        setTimeout(() => {
            dispatch(pushTokenRouteUpdate("developer_platform"))
        } ,2000)
        setTimeout(() => {
            if(branchrouteUpdaterRef.current[0].key === 'route_updated'){
                history.push(appRouter.devPlatform.path)
                setIsLoading(false)
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully navigate to developer platform.'
                  })

            }
        }, 3000)
    }
    return(
        <>
        <div>
               <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <p className="navbar-brand ps-1" style={{fontSize: '20px'}}>&nbsp;&nbsp;Developers Portal</p>
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={togglenav} style={{color: 'white'}}><Icon.Box /></button>
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    
                </form>
                <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div style={{color: 'white', fontSize: '16px'}}>
                    </div>
                </div>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {JSON.parse(localStorage.getItem('keySaved'))[0].fname + " " + JSON.parse(localStorage.getItem('keySaved'))[0].lname}
                    </a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#!">Action</a>
                                            <a className="dropdown-item" href="#!">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" style={{cursor : 'pointer'}} onClick={handleChangeBranch}>Change Branch</a>
                                            <a className="dropdown-item" style={{cursor : 'pointer'}} onClick={handleSignout}>Sign out</a>
                                            {
                                                MUIDialog({
                                                    title : 'Sign out',
                                                    message : 'Are you sure you want to sign out ?',
                                                    handleYes : handleAgree,
                                                    handleCancel : handlecancel,
                                                    isopen: open
                                                })
                                            }
                        </div>
                    </li>
                </ul>
            </nav>
            <Backdrop
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      open={isLoading}
                                    >
                                      <CircularProgress color="inherit" />
                                    </Backdrop>
        </div>
        </>
    )
}

export default AdminNavigation