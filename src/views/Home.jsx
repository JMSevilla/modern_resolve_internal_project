import React, {useState, useEffect, useRef, useMemo} from 'react'
import Navbar from '../components/Navbar/Navbar'
import CarouseApp from '../components/Carousel/Carousel'
import { useDispatch, useSelector } from 'react-redux'
import { authIdentify } from '../redux/core/loginSlice'
import { useHistory } from 'react-router-dom'
import { appRouter } from '../router/route'
import authenticationRoutes from "../router/authroute"
const HomeApp = () => {
    const [keyIdentifier, setkeyIdentifier] = useState('')
    const dispatch = useDispatch()
    const [initialRoute] = useSelector((state) => [state.login.initialRoute])
    const refResponse = useRef(initialRoute)
    const history = useHistory()
  
    useEffect(() => {
        setkeyIdentifier(localStorage.getItem('key_identifier'))
        const key = keyIdentifier ? keyIdentifier : 'unknown'
        dispatch(authIdentify(key))
        refResponse.current = initialRoute
        setTimeout(() => {
            if(refResponse.current === undefined || refResponse.current === null) {
                return false
            } else if(refResponse.current[0].key.key === 'token_exist_dev_platform') { 
                //route to dev platform
                history.push({
                    pathname: appRouter.devPlatform.path,
                    search : "?secure=" + authenticationRoutes.hashURL(100),
                    state : {secure : authenticationRoutes.hashURL(100)}
                  })
            } else {}
        },1000)
    } ,[initialRoute])
    

    return(
        <div>
            <Navbar />
            <CarouseApp />
            <div className="container" style={{marginTop: '100px'}}>
               
            </div>
        </div>
    )
}

export default HomeApp