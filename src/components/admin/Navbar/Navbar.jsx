import React from 'react'
import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

const adminNavigation = () => {
    const togglenav = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
               localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
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
                    
                    </li>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default adminNavigation