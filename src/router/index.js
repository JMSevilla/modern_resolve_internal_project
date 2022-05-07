import React from 'react'
import {appRouter} from './route'
import { Route, Switch } from "react-router-dom";
import Home from '../views/Home'
import AppRegistration from '../views/Registration'
import DEVPlatform from '../views/devPlatform/Platform'
import AdminNavigation from '../components/admin/Navbar/Navbar'
import DashboardExile from '../views/code/Dashboard/Dashboard'
import SidebarMenu from '../components/admin/Sidebar/Sidebar';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './style.css'

const RouteWithLoad = ({component : Component, ...rest}) => {
    return(
        <Route {...rest} render={props => (<> <Component {...props} /> </>)} />
    )
}
const RouteWithSidebar = ({component: Component, ...rest}) => {
   
    return(
        <Route {...rest} render={props => (
            <>
            <AdminNavigation />
          <div className="d-flex" id="wrapper">
            <div id="sidebar-wrapper">
            <ProSidebar>
                            <Menu iconShape="square">
                                <MenuItem >Dashboard</MenuItem>
                                <SubMenu title="Components">
                                <MenuItem>Component 1</MenuItem>
                                <MenuItem>Component 2</MenuItem>
                                </SubMenu>
                            </Menu>
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
    </Switch>
)