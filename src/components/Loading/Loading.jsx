import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingArea = ({isLoading, handleCloseBackDropLoading}) => {
    return(
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleCloseBackDropLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default LoadingArea