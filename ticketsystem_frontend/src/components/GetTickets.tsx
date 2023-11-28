import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Ticket {
    id: number,
    title: string,
    content: string,
    status: number,
    createdDate: string,
    updatedDate: string,
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Ticket #', type: 'number', width: 70 },
    { field: 'title', headerName: 'Summary', flex: 1 },
    { field: 'status', headerName: 'Status', type: 'number', flex: 1 },
    { field: 'createdDate', headerName: 'Created', flex: 1 },
    { field: 'updatedDate', headerName: 'Last Updated', flex: 1 },
]

export default function GetTickets() {
    const [ticketData, setTicketData] = useState<Ticket[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7278/api/tickets', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }

                const jsonData = (await response.json()) as Ticket[];
                setTicketData(jsonData);
            } catch (error) {
                if (error instanceof Error) {
                    console.log('error message: ', error.message);
                    return error.message;
                } else {
                    console.log('unexpexted error: ', error);
                    return 'An unexpected error occurred';
                }
            }
        };

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
