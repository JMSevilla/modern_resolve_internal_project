import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import CarouseApp from '../components/Carousel/Carousel'
const HomeApp = () => {
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