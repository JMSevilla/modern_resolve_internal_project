import React from 'react'
import {appRouter} from './route'
import { Route, Switch } from "react-router-dom";
import Home from '../views/Home'
import AppRegistration from '../views/Registration'
import DEVPlatform from '../views/devPlatform/Platform'
import AdminNavigation from '../components/admin/Navbar/Navbar'
import DashboardExile from '../views/code/Dashboard/Dashboard'
import SidebarMenu from '../components/admin/Sidebar/Sidebar';
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarContent, SidebarHeader, SidebarFooter} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './style.css'
import logo from '../assets/circularlogo.png'
import AddUser from '../views/code/pages/Adduser';
import { useHistory } from 'react-router-dom';

const RouteWithLoad = ({component : Component, ...rest}) => {
    return(
        <Route {...rest} render={props => (<> <Component {...props} /> </>)} />
    )
}
const RouteWithSidebar = ({component: Component, ...rest}) => {
    const history = useHistory()
    const sidebarheaderLogo = () => {
        return(
            <React.Fragment>
                <div>
                    <center>
                    <img 
                    src={logo}
                    style={{width: '50%', height: 'auto', padding: '15px'}}
                    className='img-fluid'
                    />
                    </center>
                </div>
            </React.Fragment>
        )
    }
    const navAdduser = () => {
        history.push(appRouter.DashboardAddUser.path)
    }
    const navDashboard = () => {
        history.push(appRouter.DashboardOverview.path)
    }
    return(
        <Route {...rest} render={props => (
            <>
            <AdminNavigation />
          <div className="d-flex" id="wrapper">
            <div id="sidebar-wrapper">
            <ProSidebar>
                <SidebarHeader>
                    {
                        sidebarheaderLogo()
                    }    
                </SidebarHeader> 
                <SidebarContent>
                <Menu iconShape="square">
                                <MenuItem onClick={navDashboard}>Dashboard</MenuItem>
                                <SubMenu title="User Management">
                                <MenuItem onClick={navAdduser}>Add user</MenuItem>
                                </SubMenu>
                            </Menu>
                </SidebarContent>    
                <SidebarFooter>
                <p>© Modern Resolve Org, All Right Reserved.</p>
                </SidebarFooter>           
            </ProSidebar>
            </div>
          
          <div id="page-content-wrapper">
          
          <div className="container-fluid">
          <Component {...props} />
                </div>
          </div>
          </div>
            </>
        )}
        />
    );
};
export default () => (
    <Switch>
        <RouteWithLoad exact path={appRouter.Homepage.path} component={Home} />
        <RouteWithLoad exact path={appRouter.Registration.path} component={AppRegistration} />
        <RouteWithLoad exact path={appRouter.devPlatform.path} component={DEVPlatform} />

        <RouteWithSidebar exact path={appRouter.DashboardOverview.path} component={DashboardExile} />
        <RouteWithSidebar exact path={appRouter.DashboardAddUser.path} component={AddUser} />
    </Switch>
)