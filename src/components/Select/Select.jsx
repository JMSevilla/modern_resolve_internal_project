import * as React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';


const BasicSelect = ({value, handleSelect, selectionArray, selectionLabel, selectionTitle,
    isError = false}) => {

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
    return (
        <FormControl fullWidth error={isError}>
            <Typography gutterBottom>
                                            {selectionTitle}
                                        </Typography>
            <Select
              id={(isError ? 'demo-simple-select-error' : 'demo-simple-select-error')}
              value={value}
              label={selectionLabel}
              onChange={handleSelect}
              defaultValue='Kindly select'
              labelId={(isError ? 'demo-simple-select-error-label' : 'demo-simple-select-error-label')}
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