import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


interface Ticket {
    id: number,
    title: string,
    content: string,
    status: number,
    createdDate: string,
    updatedDate: string,
}


function GetTickets() {
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ticket #</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Last Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ticketData?.map((ticket, index) => (
                        <TableRow key={ index }>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell>{ticket.createdDate}</TableCell>
                            <TableCell>{ticket.updatedDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default GetTickets;