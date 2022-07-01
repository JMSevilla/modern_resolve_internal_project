import React, {useState, useEffect, useRef, useContext} from 'react'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import AppCard from '../../../components/Card/Card';
import ProjectTable from '../../../components/Table/Table';
import { HandleFetchContext } from '../../../redux/core/context/base/FetchContext';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MUIDialogv2 from '../../../components/Dialog/Dialogv2';
import MUIButton from '../../../components/Button/Button';
import MUIText from '../../../components/TextField/TextField';
import { Grid } from '@mui/material';

  const AddUser = () => {
    const contextValues = useContext(HandleFetchContext)
    const { GET_USERLIST, allFieldsSelected, editTransferContextData, selectedIndex } = contextValues
    
    const [isopen, setOpen] = useState(false)
    const customStyle = {
      width: '100%',
      marginBottom: '20px'
    }
  
      const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
 useEffect(() => {
  GET_USERLIST(4)
 },[])
 const openEdit = (paramsId, fname, lname, username, pass) => {
  setOpen(true)
  let object = {
    id : paramsId,
    firstname : fname,
    lastname : lname,
    username : username,
    password : pass
  }
  editTransferContextData(object, 5)
 }
 const handleCancel = () => {
  setOpen(false)
 }
 const handleYes = () => {
  setOpen(false)
 }
 const EditingContent = () => {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MUIText 
              typography={'Firstname'}
              id={'filled-basic'}
              label={'Your firstname'}
              type={'text'}
              stylish={customStyle}
              variant={'filled'}
              value={allFieldsSelected[selectedIndex].fieldSettings.usersObj.firstname}
              helperTextHelper={allFieldsSelected[selectedIndex].fieldSettings.error_provider_message.epm_firstname}
              isError={allFieldsSelected[selectedIndex].fieldSettings.errorProvider.error_firstname}
          />
        </Grid>
        <Grid item xs={6}>
          <MUIText 
                typography={'Lastname'}
                id={'filled-basic'}
                label={'Your lastname'}
                type={'text'}
                stylish={customStyle}
                variant={'filled'}
                value={allFieldsSelected[selectedIndex].fieldSettings.usersObj.lastname}
                helperTextHelper={allFieldsSelected[selectedIndex].fieldSettings.error_provider_message.epm_lastname}
                isError={allFieldsSelected[selectedIndex].fieldSettings.errorProvider.error_lastname}
            />
        </Grid>
      </Grid>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
          <MUIText 
                typography={'Username'}
                id={'filled-basic'}
                label={'Your username'}
                type={'text'}
                stylish={customStyle}
                variant={'filled'}
                value={allFieldsSelected[selectedIndex].fieldSettings.usersObj.username}
                helperTextHelper={allFieldsSelected[selectedIndex].fieldSettings.error_provider_message.epm_username}
                isError={allFieldsSelected[selectedIndex].fieldSettings.errorProvider.error_username}
            />
        </Grid>
        <Grid item xs={6}>
          <MUIText 
                typography={'Password'}
                id={'filled-basic'}
                label={'Your password'}
                type={'password'}
                stylish={customStyle}
                variant={'filled'}
                value={allFieldsSelected[selectedIndex].fieldSettings.usersObj.password}
                helperTextHelper={allFieldsSelected[selectedIndex].fieldSettings.error_provider_message.epm_password}
                isError={allFieldsSelected[selectedIndex].fieldSettings.errorProvider.error_password}
            />
        </Grid>
      </Grid>
      
    </>
  )
 }
 const EditDialogContent = () => {
  return (
    <>
          <DialogTitle id="alert-dialog-title">
                <h3>Edit user account</h3>
          </DialogTitle>
          <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Here you can edit the user's account
                </DialogContentText>
            {EditingContent()}
          </DialogContent>
          <DialogActions>
                <MUIButton
                size={'sm'}
                variant={'outlined'}
                color={'primary'}
                onhandleClick={handleCancel}
                buttonName={'Cancel'}
                ></MUIButton>
                <MUIButton
                size={'sm'}
                variant={'contained'}
                color={'primary'}
                onhandleClick={handleYes}
                buttonName={'Update'}
                >
                </MUIButton>
          </DialogActions>
    </>
  )
 }
  const ApplicationUserCardContent = () => {
    return (
      <>
        <CardContent>
          <Typography  variant="h6"  component="div">
                Create an user account
                <MUIButton
            size={'sm'}
            variant={'contained'}
            color={'success'}
            buttonName={'Add new user'}
            stylish={{float : 'right', marginBottom: '10px'}}
            >
            </MUIButton>
          </Typography>
          <ProjectTable 
            projectData={allFieldsSelected[4].fieldSettings.userlist}
            openEdit={openEdit}
          />
          <MUIDialogv2
          isopen={isopen}
          handleCancel={handleCancel}
          >
            <EditDialogContent></EditDialogContent>
          </MUIDialogv2>
        </CardContent>
      </>
    )
  }
  return(
      <>
          <div className='container' style={{marginTop: '100px'}}>
          <div style={{marginBottom : '50px'}}>
                  <h3>User Access Management</h3>
                  <p>You can manage all users and access here .</p>
          </div>
            <AppCard children={<ApplicationUserCardContent />} />
          </div>
      </>
  )
}

export default AddUser
