import React, { useContext } from 'react';
import { AlertType } from '../types/ticketTypes';
import Alert from '@mui/material/Alert';
import { DashboardStateContext } from '../context/DashboardContext';
import { AlertInfo } from '../types/ticketTypes';


export default function ShowAlert({ type, message }: AlertInfo) {
    const { setShowAlert } = useContext(DashboardStateContext);

    return (
        <Alert severity={type} onClose={() => {setShowAlert(false)}} variant='filled' sx={{
            position: 'fixed',
            bottom: 20, 
            left: 20, 
            zIndex: 9999, 
        }}>
            { message }
        </Alert>
    );
}