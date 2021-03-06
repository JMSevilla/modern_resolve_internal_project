import * as React from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const MUIText = ({
    typography, 
    dataOnChange,
    id,
    label,
    type,
    stylish,
    isMultiline = false,
    variant,
    isError = false,
    helperTextHelper,
    value,
    disabled
}) => {
    
    const helperIsEnable = () => {
        if(isError){
            return (
                <>
                     <Typography gutterBottom>
                    {typography}
                        </Typography>
                        <TextField 
                        onChange={dataOnChange}
                        id={id}
                        label={label}
                        type={type}
                        style={stylish}
                        variant={variant}
                        error={isError}
                        helperText={helperTextHelper}
                        value={value}
                        disabled={disabled}
                        />
                </>
            )
        }
        else{
            return(
                <>
                     <Typography gutterBottom>
                    {typography}
                        </Typography>
                        <TextField 
                        onChange={dataOnChange}
                        id={id}
                        label={label}
                        type={type}
                        style={stylish}
                        variant={variant}
                        value={value}
                        disabled={disabled}
                        />
                </>
            )
        }
       
    }
   
    if(isMultiline){
        return (
            <>
            <Typography gutterBottom>
                {typography}
            </Typography>
            <TextField 
            onChange={dataOnChange}
            id={id}
            label={label}
            type={type}
            style={stylish}
            variant={variant}
            multiline
            maxRows={4}
            error={isError}
            helperText={helperTextHelper}
            value={value}
            disabled={disabled}
            />
            </>
        )
    }else {
        return(
            <>
               {helperIsEnable()}
            </>
        )
    }
}

export default MUIText