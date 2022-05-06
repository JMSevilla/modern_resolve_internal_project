import * as React from 'react'
import Button from '@mui/material/Button';

const MUIButton = ({
    onhandleClick,
    size,
    variant,
    buttonName,
    stylish,
    color
}) => {
    return (
        <>
            <Button
            onClick={onhandleClick}
            size={size}
            variant={variant}
            style={stylish}
            color={color}
            >{buttonName}</Button>
        </>
    )
}

export default MUIButton