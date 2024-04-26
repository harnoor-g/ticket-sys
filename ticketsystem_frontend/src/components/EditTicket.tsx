import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { TicketData, TicketStatus, getEnumValue, getStatusLabel } from '../types/ticketTypes';
import { fetchTicket, updateTicket } from '../services/ticketServices';


interface FormProps {
    ticketId: number,
    onClose: () => void,
}

export default function EditTicket({ ticketId, onClose }: FormProps) {
    const [formData, setFormData] = useState<TicketData>({
        title: '',
        content: '',
        status: TicketStatus.ToDo,
    });

    const optionsArr = useMemo(() => {
        return Object.values(TicketStatus)
            .filter(status => typeof status === 'number')
            .map(status => getStatusLabel(status));
    }, []);

    const [optionsValue, setOptionsValue] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const jsonData = await fetchTicket(ticketId);
            setFormData(jsonData);
        };
        fetchData();
    }, [setFormData]);

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        formData.status = getEnumValue(optionsValue);
        try {
            if (ticketId < 0) {
                throw new Error('Incorrect ID provided');
            } else {
                updateTicket(ticketId, formData);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw new Error('An unexpected error occurred while fetching tickets');
        }
        onClose();
    };


    return (
        <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '107%',
            bgcolor: 'rgba(0,0,0,0.54)',
            colour: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Paper variant="outlined" sx={{ width: '30%', my: { xs: 3, md: 6 }, p: { xs: 2, md: 2 } }}>
                <Typography variant="h6" gutterBottom>
                    Edit Ticket
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            fullWidth
                            autoComplete="ticket-title"
                            value={formData.title}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            id="content"
                            name="content"
                            label="Description"
                            fullWidth
                            autoComplete="ticket-content"
                            multiline
                            rows={5}
                            value={formData.content}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={optionsArr[formData.status]}
                            onChange={(event: any, newValue: string | null) => {
                                setOptionsValue(newValue);
                            }}
                            options={optionsArr}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField required {...params} label="Status" />}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ m: 1 }} variant='contained' type="submit" onClick={handleSubmit} >Update Ticket</Button>
                    <Button sx={{ m: 1 }} variant='outlined' onClick={onClose}>Close</Button>
                </Box>
            </Paper>

        </Box>
    )
}