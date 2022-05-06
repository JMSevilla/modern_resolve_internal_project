import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const MUIDialog = (props) => {
    const {
        title, message, handleYes, handleCancel, isopen
    } = props
    return (
        <>
             <Dialog
                maxWidth='sm'
                fullWidth={true}
                open={isopen}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {title}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   {message}.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleYes} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MUIDialog