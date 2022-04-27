import * as React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

const SelectQuestions = ({clientSecQuestion, handleClientSecQuestions, secQuestionsArray, 
    isError = false}) => {
    const HelperText = () => {
        if(isError) {
            return (
                <>
                    <FormHelperText>Kindly select a security question.</FormHelperText>
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
             Security Questions
             </Typography>
            <Select
              id={(isError ? 'demo-simple-select-error' : 'demo-simple-select-error')}
              value={clientSecQuestion}
              label="Security Questions"
              onChange={handleClientSecQuestions}
              labelId={(isError ? 'demo-simple-select-error-label' : 'demo-simple-select-error-label')}
            >
                {
                    secQuestionsArray.map((i) => {
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

export default SelectQuestions