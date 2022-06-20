import React, {useState, useContext} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { makeStyles } from '@mui/styles';
import { HandleFieldContext } from '../../redux/core/context/base/FieldContext';
import {Box, Chip} from '@mui/material'


const BasicSelect = ({value, handleSelect, selectionArray, selectionLabel, selectionTitle,
    isError = false, placeholder, handleRenderedValue, multiple = false, isChip = false}) => {
    
    const HelperText = () => {
        if(isError) {
            return (
                <>
                    <FormHelperText>Kindly select system.</FormHelperText>
                </>
            )
        }else {
            return(
                <></>
            )
        }
    }
    const usePlaceholderStyles = makeStyles(theme => ({
        placeholder: {
          color: "#aaa"
        }
    }));
    const Placeholder = ({children}) => {
        const classes = usePlaceholderStyles();
        return <div className={classes.placeholder}>{children}</div>
    }
    return (
        <FormControl fullWidth error={isError}>
           {
            multiple ? 
            (
                <>
                    <Typography gutterBottom>
                    {selectionTitle}
                </Typography>
            <InputLabel id="demo-multiple-chip-label">Choose your desired roles</InputLabel>
                </>
            )
            :  <Typography gutterBottom>
                    {selectionTitle}
                </Typography>
           }
            <Select
            fullWidth
            id={isChip ? 'demo-multiple-chip' : (isError ? 'demo-simple-select-error' : 'demo-simple-select-error')}
            value={value}
            label={selectionLabel}
            onChange={handleSelect}
            multiple={multiple}
            displayEmpty
            labelId={multiple ? "demo-multiple-chip-label" :(isError ? 'demo-simple-select-error-label' : 'demo-simple-select-error-label')}
            renderValue={
                multiple ? 
                (selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {

                            return (
                                <>
                                    <Chip key={value} value={value} label={value} />
                                </>
                            )
                        })}
                    </Box> 
                )
                : handleRenderedValue !== ""
                ? undefined : () => <Placeholder>{placeholder}</Placeholder>
              }  
            >
                {
                    selectionArray.map((i) => {
                        return (
                            <MenuItem value={i.value}>{i.label}</MenuItem>
                        )
                    })
                }
            </Select>
                {HelperText()}
          </FormControl>
      );
}

export default BasicSelect