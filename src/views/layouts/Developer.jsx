import React, {useContext, useState} from 'react'
import AppCard from '../../components/Card/Card'
import { Container, Typography, Box, Grid } from '@mui/material'
import MUIText from '../../components/TextField/TextField'
import { Context } from '../../redux/core/context/context'
import MUIStepper from '../../components/Stepper/Stepper'
import {HandleFieldContext} from '../../redux/core/context/base/FieldContext'
import MUIButton from '../../components/Button/Button'
import { steps, OccupationType, OccupationPosition, DegreeList } from '../../redux/core/utils/helper'
import BasicSelect from '../../components/Select/Select'
import LoadingArea from '../../components/Loading/Loading'

const customStyle = {
    width: '100%',
    marginBottom: '20px'
}

const DeveloperContent = () => {
    const contextValues = useContext(Context)
    const handlecontextValues = useContext(HandleFieldContext)
    const { 
        handleFirstname, handleLastname, allFieldSelected,
        handleUsername,
        handlePassword, handleConfirmPassword, handleOccupationType,
        handlePositionSelection, handleStudy, handleDegree, handleAddress ,
        handleOccupationReason} = handlecontextValues
    const { activeSteps, devNext, setActiveSteps, isLoading, handleCloseBackDropLoading } = contextValues
    
    return (
        <React.Fragment>
                <Typography style={{marginBottom: '10px'}} variant="h6"  component="div">
                  Developer Registration
                </Typography>
                <Container fixed>
                     <MUIStepper />
                        {
                            activeSteps == 0 ? (
                                <React.Fragment>
                                    <MUIText 
                                        typography={'Firstname'}
                                        id={'outlined-basic'}
                                        label={'Your firstname'}
                                        type={'text'}
                                        stylish={customStyle}
                                        variant={'outlined'}
                                        dataOnChange={(e) => handleFirstname(e, 3)}
                                        isError={allFieldSelected[3].fieldSettings.errorProvider.error_firstname}
                                        helperTextHelper={allFieldSelected[3].fieldSettings.error_provider_message.epm_firstname}
                                        value={allFieldSelected[3].fieldSettings.personalInformation.firstname}
                                    />  

                                    <MUIText 
                                        typography={'Lastname'}
                                        id={'outlined-basic'}
                                        label={'Your lastname'}
                                        type={'text'}
                                        stylish={customStyle}
                                        variant={'outlined'}
                                        dataOnChange={(e) => handleLastname(e, 3)}
                                        isError={allFieldSelected[3].fieldSettings.errorProvider.error_lastname}
                                        helperTextHelper={allFieldSelected[3].fieldSettings.error_provider_message.epm_lastname}
                                        value={allFieldSelected[3].fieldSettings.personalInformation.lastname}
                                    />
                                </React.Fragment>
                            ) : activeSteps == 1 ? (
                            <React.Fragment>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                    
                                        <BasicSelect 
                                            value={allFieldSelected[3].fieldSettings.workInformation.occupationStatus}
                                            selectionArray={OccupationType}
                                            selectionTitle={'What team do you desired ?'}
                                            placeholder={'Select your team'}
                                            handleSelect={(e) => handleOccupationType(e, 3)}
                                            handleRenderedValue={allFieldSelected[3].fieldSettings.workInformation.occupationStatus}
                                         />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MUIText 
                                            typography={'Reason of joining'}
                                            id={'outlined-basic'}
                                            label={'State your reason'}
                                            isMultiline={true}
                                            type={'text'}
                                            stylish={customStyle}
                                            variant={'outlined'}
                                            dataOnChange={(e) => handleOccupationReason(e, 3)}
                                            value={allFieldSelected[3].fieldSettings.workInformation.occupationDetails}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <BasicSelect 
                                            value={allFieldSelected[3].fieldSettings.workInformation.occupationPositionWork}
                                            selectionArray={OccupationPosition}
                                            selectionTitle={'Join the team as ?'}
                                            placeholder={'Select your desired role'}
                                            isChip={true}
                                            multiple={true}
                                            handleSelect={(e) => handlePositionSelection(e, 3)}
                                            handleRenderedValue={allFieldSelected[3].fieldSettings.workInformation.occupationPositionWork}
                                         />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MUIText 
                                            typography={'If Studying'}
                                            id={'outlined-basic'}
                                            label={'Name Of School'}
                                            isMultiline={false}
                                            type={'text'}
                                            stylish={customStyle}
                                            variant={'outlined'}
                                            dataOnChange={(e) => handleStudy(e, 3)}
                                            value={allFieldSelected[3].fieldSettings.workInformation.nameofschool}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <BasicSelect 
                                            value={allFieldSelected[3].fieldSettings.workInformation.degree}
                                            selectionArray={DegreeList}
                                            selectionTitle={'Degree'}
                                            placeholder={'Select your degree'}
                                            isChip={false}
                                            multiple={false}
                                            handleSelect={(e) => handleDegree(e, 3)}
                                            handleRenderedValue={allFieldSelected[3].fieldSettings.workInformation.degree}
                                         />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MUIText 
                                            typography={'Address'}
                                            id={'outlined-basic'}
                                            label={'Your address'}
                                            isMultiline={true}
                                            type={'text'}
                                            stylish={customStyle}
                                            variant={'outlined'}
                                            dataOnChange={(e) => handleAddress(e, 3)}
                                            value={allFieldSelected[3].fieldSettings.workInformation.address}
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            ) : activeSteps == 2 ? (
                                <React.Fragment>
                                     <MUIText 
                                        typography={'Username'}
                                        id={'outlined-basic'}
                                        label={'Your username'}
                                        type={'text'}
                                        stylish={customStyle}
                                        variant={'outlined'}
                                        dataOnChange={(e) => handleUsername(e, 3)}
                                        isError={allFieldSelected[3].fieldSettings.errorProvider.error_username}
                                        helperTextHelper={allFieldSelected[3].fieldSettings.error_provider_message.epm_username}
                                        value={allFieldSelected[3].fieldSettings.credentialsInformation.username}
                                    />  

                                    <MUIText 
                                        typography={'Password'}
                                        id={'outlined-basic'}
                                        label={'Your password'}
                                        type={'password'}
                                        stylish={customStyle}
                                        variant={'outlined'}
                                        dataOnChange={(e) => handlePassword(e, 3)}
                                        isError={allFieldSelected[3].fieldSettings.errorProvider.error_password}
                                        helperTextHelper={allFieldSelected[3].fieldSettings.error_provider_message.epm_password}
                                        value={allFieldSelected[3].fieldSettings.credentialsInformation.password}
                                    />

                                    <MUIText 
                                        typography={'Confirm Password'}
                                        id={'outlined-basic'}
                                        label={'kindly confirm your password'}
                                        type={'password'}
                                        stylish={customStyle}
                                        variant={'outlined'}
                                        dataOnChange={(e) => handleConfirmPassword(e, 3)}
                                        isError={allFieldSelected[3].fieldSettings.errorProvider.error_conpassword}
                                        helperTextHelper={allFieldSelected[3].fieldSettings.error_provider_message.epm_conpassword}
                                        value={allFieldSelected[3].fieldSettings.credentialsInformation.conpassword}
                                    />
                                </React.Fragment>
                            ) : 
                            <React.Fragment>
                                <center>
                                    <img 
                                    src="https://cdn.dribbble.com/users/841193/screenshots/3144676/media/922abdc08fd70ed8cafa6dae3e234643.gif"
                                    alt="Success"
                                    className="img-fluid"
                                    style={{width: '50%', height: 'auto'}}
                                    />
                                    <Typography style={{marginBottom: '10px', marginTop: '10px'}} variant="h6"  component="div">
                                         You're all caught up
                                    </Typography>
                                    <Typography style={{marginTop: '10px'}} variant="overline" display="block" gutterBottom>
                                        Your account has been successfully created, please wait for administrator's approval
                                    </Typography>
                                </center>
                            </React.Fragment>
                        }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            
                            <MUIButton 
                            color={'inherit'}
                            size={'sm'} 
                            buttonName={'Back'}
                            disabled={activeSteps === 0}
                            sx={{mr : 1}}
                            onhandleClick={() => setActiveSteps((activeSteps) => activeSteps - 1)}
                             />
                            <Box sx={{ flex: '1 1 auto' }} />
                                <MUIButton onhandleClick={() => devNext(3)} buttonName={activeSteps === steps.length - 1 ? 'Finish' : 'Next'} />
                            </Box>
                        </Container>
                         <LoadingArea 
            isLoading={isLoading}
            handleCloseBackDropLoading={handleCloseBackDropLoading} />
        </React.Fragment>
    )
}

const Developer = () => {
    return(
        <React.Fragment>
            <AppCard children={<DeveloperContent />} />
        </React.Fragment>
    )
}

export default Developer