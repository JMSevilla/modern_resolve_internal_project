import React from 'react'
import { Carousel } from 'react-bootstrap'

const CarouseApp = () => {
    return (
        <div>
            <Carousel >
                <Carousel.Item >
                    <img
                    className="img-fluid"
                    src="https://cdn.dribbble.com/users/1791775/screenshots/6832881/___.gif"
                    alt="First slide"
                    style={{color : 'black'}}
                    />
                    <Carousel.Caption>
                    <h3>Modern Resolve Organization</h3>
                    <p>We will help you to build your system for your business.</p>
                    </Carousel.Caption>
                </Carousel.Item>
               
                </Carousel>
        </div>
    )
}

export default CarouseApp