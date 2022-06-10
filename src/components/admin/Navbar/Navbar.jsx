import React, {useEffect, useState, useRef, useContext} from 'react'
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
import { Context } from '../../../redux/core/context/context'

const AdminNavigation = () => {
    const contextValues = useContext(Context)
    const {isLoading, handleDevSignout, open, setIsOpen, handleChangeBranch} = contextValues
    
    const [ branchMessage
    ] = useSelector((state) => [state.branch.branchMessage])
   
    const togglenav = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
               localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
    const branchrouteUpdaterRef = useRef(branchMessage)
    useEffect(() => {
        branchrouteUpdaterRef.current = branchMessage
    }, [ branchMessage])
    const handleSignout = () => {
        setIsOpen(true)
    }
    
    const handlecancel = () => {
        setIsOpen(false)
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
                                            <a className="dropdown-item" style={{cursor : 'pointer'}} onClick={() => handleChangeBranch('developer_platform', 0)}>Change Branch</a>
                                            <a className="dropdown-item" style={{cursor : 'pointer'}} onClick={handleSignout}>Sign out</a>
                                            {
                                                MUIDialog({
                                                    title : 'Sign out',
                                                    message : 'Are you sure you want to sign out ?',
                                                    handleYes : () => handleDevSignout(2),
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