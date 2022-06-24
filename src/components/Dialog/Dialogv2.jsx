import React from 'react'
import Dialog from '@mui/material/Dialog';
const MUIDialogv2 = ({ children, isopen, handleCancel }) => {
    
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
                {children}
            </Dialog>
        </>
    )
}

export default MUIDialogv2