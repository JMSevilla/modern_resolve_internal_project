import * as React from 'react'
import Button from '@mui/material/Button';

const MUIButton = ({
    onhandleClick,
    size,
    variant,
    buttonName
}) => {
    return (
        <>
            <Button
            onClick={onhandleClick}
            size={size}
            variant={variant}
            >{buttonName}</Button>
        </>
    )
}

export default MUIButton