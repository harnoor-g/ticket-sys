import { useEffect, useState } from 'react';
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { Ticket, getStatusLabel } from '../types/ticketTypes';
import { fetchTickets } from '../services/ticketServices';

interface DataGridProps {
    onRowClick: (p: GridRowParams, e: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => void,
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Ticket #', type: 'number', width: 70 },
    { field: 'title', headerName: 'Summary', flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        type: 'number',
        flex: 1,
        valueGetter: (params) => getStatusLabel(params.row.status)
    },
    { field: 'createdDate', headerName: 'Created', flex: 1 },
    { field: 'updatedDate', headerName: 'Last Updated', flex: 1 },
]

export default function GetTickets({ onRowClick }: DataGridProps) {
    const [ticketData, setTicketData] = useState<Ticket[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTickets();
            setTicketData(data);
        }
        fetchData();
    }, []);

    if (!ticketData) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div>
            <DataGrid
                rows={ticketData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                pageSizeOptions={[15, 20, 30, 50]}
                checkboxSelection={false}
                getRowId={(row) => row.id}
                onRowClick={onRowClick}
            />
        </div>
    );
}
