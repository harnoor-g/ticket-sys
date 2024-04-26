import { Box, Button, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import GetTickets from './GetTickets';
import NewTicket from './NewTicket';
import { DashboardStateContext } from '../context/DashboardContext';



export default function TicketDashboard() {
    const { isEditBtnDisabled, setEditBtnDisabled, isDeleteBtnDisabled, setDeleteBtnDisabled, showAlert, setShowAlert, showDialog, setShowDialog } = useContext(DashboardStateContext);
    const [showNewTicketCard, setShowNewTicketCard] = useState(false);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container>
                <Grid item xs={12} >
                    <Box>
                        <Button sx={{ m:2 }} variant="outlined" onClick={() => setShowNewTicketCard(true)}>
                            New Ticket
                        </Button>

                    </Box>
                    <Paper sx={{ p:2, display: 'flex', flexDirection: 'column', overflow: 'auto'}}>

                        <GetTickets />

                    </Paper>
                </Grid>
            </Grid>
            {showNewTicketCard && <NewTicket showCard={showNewTicketCard} onClose={() => setShowNewTicketCard(false)} />}
        </Box>
    );
}