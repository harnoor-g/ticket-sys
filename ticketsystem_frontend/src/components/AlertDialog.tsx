import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext } from 'react';
import { DashboardStateContext } from '../context/DashboardContext';
import { DialogInfo } from '../types/ticketTypes';


interface AlertDialogProps {
    onConfirm: () => void;
    dialogInfo: DialogInfo
}

export default function AlertDialog({ onConfirm, dialogInfo }: AlertDialogProps) {
    const { showDialog, setShowDialog } = useContext(DashboardStateContext);

    const handleClose = () => {
        setShowDialog(false)
    };

    return (
        <Dialog
            open={showDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogInfo.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogInfo.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );

}