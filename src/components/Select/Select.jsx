import * as React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

const BasicSelect = ({occupation, handleOccupation, occupationArray, 
    isError = false}) => {
    const HelperText = () => {
        if(isError) {
            return (
                <>
                    <FormHelperText>Kindly select occupation status.</FormHelperText>
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
                                            Occupation Status
                                        </Typography>
            <Select
              id={(isError ? 'demo-simple-select-error' : 'demo-simple-select-error')}
              value={occupation}
              label="Occupation"
              onChange={handleOccupation}
              labelId={(isError ? 'demo-simple-select-error-label' : 'demo-simple-select-error-label')}
            >
                {
                    occupationArray.map((i) => {
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