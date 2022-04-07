import React from 'react'
import { Carousel } from 'react-bootstrap'

const CarouseApp = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--JeM7K_XV--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r3ui703pme0meo82pu5o.png"
                    alt="First slide"
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