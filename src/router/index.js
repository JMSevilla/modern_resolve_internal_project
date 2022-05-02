import React from 'react'
import {appRouter} from './route'
import { Route, Switch } from "react-router-dom";
import Home from '../views/Home'
import AppRegistration from '../views/Registration'
import DEVPlatform from '../views/devPlatform/Platform'
const RouteWithLoad = ({component : Component, ...rest}) => {
    return(
        <Route {...rest} render={props => (<> <Component {...props} /> </>)} />
    )
}

export default () => (
    <Switch>
        <RouteWithLoad exact path={appRouter.Homepage.path} component={Home} />
        <RouteWithLoad exact path={appRouter.Registration.path} component={AppRegistration} />
        <RouteWithLoad exact path={appRouter.devPlatform.path} component={DEVPlatform} />
    </Switch>
)