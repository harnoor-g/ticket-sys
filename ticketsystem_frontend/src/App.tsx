import React, { useEffect, useState } from 'react';
import './App.css';


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
            {ticketData?.map((ticket, index) => (
                <p key={index}> {ticket.title} </p>
            ))}
        </div>
    );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GetTickets/>
      </header>
    </div>
  );
}

export default App;
