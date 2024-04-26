import { Box, Button, Grid, Paper } from '@mui/material';
import { GridRowParams, MuiEvent } from '@mui/x-data-grid';
import React, { useContext, useState } from 'react';
import EditTicket from './EditTicket';
import GetTickets from './GetTickets';
import NewTicket from './NewTicket';
import { DashboardStateContext } from '../context/DashboardContext';
import { deleteTicket } from '../services/ticketServices';
import ShowAlert from './ShowAlert';
import { AlertInfo, AlertType, DialogInfo } from '../types/ticketTypes';
import AlertDialog from './AlertDialog';


export default function TicketDashboard() {
    const { isEditBtnDisabled, setEditBtnDisabled, isDeleteBtnDisabled, setDeleteBtnDisabled, showAlert, setShowAlert, showDialog, setShowDialog } = useContext(DashboardStateContext);
    const [showNewTicketCard, setShowNewTicketCard] = useState(false);
    const [showEditTicketCard, setShowEditTicketCard] = useState(false);
    const [ticketID, setTicketID] = useState<number>(-1);
    const [alert, setAlert] = useState<AlertInfo>({} as AlertInfo);
    const [dialog, setDialog] = useState<DialogInfo>({} as DialogInfo);

    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        const id: number = parseInt(params.id.toString());
        setTicketID(id);
        setEditBtnDisabled(false);
        setDeleteBtnDisabled(false);
    }

    const handleDeleteClick = () => {
        if (ticketID !== -1) {
            setDialog({ title: 'Are you sure you want to delete this ticket?', message: `Ticket #${ticketID}` });
            setShowDialog(true);
        } else {
            setAlert({ type: AlertType.Warning, message: 'Please select a ticket to delete.' });
            setShowAlert(true);
        }
    }

    const handleTicketDeletion = () => {
        deleteTicket(ticketID);
        setShowDialog(false);
        setDialog({} as DialogInfo);
        window.location.reload();
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container>
                <Grid item xs={12} >
                    <Box>
                        <Button sx={{ m: 2, bgcolor: 'green' }} variant="contained" onClick={() => setShowNewTicketCard(true)}>
                            New Ticket
                        </Button>
                        <Button sx={{ mr: 2, bgcolor: 'blue' }} variant="contained" disabled={isEditBtnDisabled} onClick={() => setShowEditTicketCard(true)}>
                            Edit
                        </Button>
                        <Button sx={{ mr: 2, bgcolor: 'red' }} variant="contained" onClick={handleDeleteClick} disabled={isDeleteBtnDisabled} >
                            Delete
                        </Button>
                        <Button sx={{ m: 2, bgcolor: 'orange' }} variant="contained" onClick={() => window.location.reload()}>
                            Refresh
                        </Button>
                    </Box>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

                        <GetTickets onRowClick={handleRowClick} />

                    </Paper>
                </Grid>
            </Grid>
            {showNewTicketCard && <NewTicket onClose={() => setShowNewTicketCard(false)} />}
            {showEditTicketCard && <EditTicket ticketId={ticketID} onClose={() => setShowEditTicketCard(false)} />}
            {showAlert && <ShowAlert type={alert.type} message={alert.message} />}
            {showDialog && <AlertDialog onConfirm={handleTicketDeletion} dialogInfo={{ title: dialog.title, message: dialog.message }} />}
        </Box>
    );
}