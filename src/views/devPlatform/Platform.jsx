import React from 'react'
import DevNavbar from '../../components/devNavbar/Navbar'
import imgDev from '../../assets/devlogo.png'
import {useSelector} from 'react-redux'
const DEVPlatform = () => {
    const [savedInfo] = useSelector((state) => [
        state.login.savedInfo
    ])
    console.log(savedInfo)
    return(
        <>
            <DevNavbar />
            <div>
            <center>
                <img 
                src={imgDev} 
                alt="No image"
                style={{width: '30%', height: 'auto'}}
                className='img-fluid' />
                </center>
            </div>
            <div style={{marginTop: '60px'}} className="container">
               
            </div>
        </>
    )
}

export default DEVPlatform