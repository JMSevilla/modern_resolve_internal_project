import React, {useContext} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {steps} from '../../redux/core/utils/helper'
import { Context } from '../../redux/core/context/context';

const MUIStepper = () => {
    const contextValues = useContext(Context)
    const { activeSteps } = contextValues
    return (
        <React.Fragment>
            <Box sx={{ width: '100%', marginTop : '20px', marginBottom: '20px' }}>
                <Stepper
                activeStep={activeSteps}
                >
                    {
                        steps.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            return(
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>
            </Box>
        </React.Fragment>
    )
}

export default MUIStepper