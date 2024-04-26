import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Ticket, getStatusLabel } from '../types/ticketTypes';
import { fetchTickets } from '../services/ticketServices';

interface Ticket {
    id: number,
    title: string,
    content: string,
    status: number,
    createdDate: string,
    updatedDate: string,
}

interface statusDict {
    [key: number]: string,
}

const statusOptions: statusDict = { 0: 'To Do', 1: 'In Progress', 2: 'Done' };

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Ticket #', type: 'number', width: 70 },
    { field: 'title', headerName: 'Summary', flex: 1 },
    {
        field: 'status', headerName: 'Status', type: 'number', flex: 1, renderCell: (params) => {
            return <>{statusOptions[params.row.status]}</>
        }
    },
    { field: 'createdDate', headerName: 'Created', flex: 1 },
    { field: 'updatedDate', headerName: 'Last Updated', flex: 1 },
]

export default function GetTickets() {
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
                checkboxSelection
                getRowId={(row) => row.id}

            />
        </div>
    );
}
