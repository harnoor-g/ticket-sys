export const fetchTickets = async () => {
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

        const jsonData = await response.json();
        return jsonData
        
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw new Error('An unexpected error occurred while fetching tickets');
    }
};

export const fetchTicket = async (ticketId: number) => {
    try {
        const response = await fetch(`https://localhost:7278/api/tickets/${ticketId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData

    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw new Error('An unexpected error occurred while fetching tickets');
    }
};

export const createTicket = async (formData: any) => {
    try {
        const response = await fetch('https://localhost:7278/api/tickets', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw new Error('An unexpected error occurred while fetching tickets');
    }
};

export const updateTicket = async (ticketId: number, formData: any) => {
    try {
        const response = await fetch(`https://localhost:7278/api/tickets/${ticketId}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw new Error('An unexpected error occurred while fetching tickets');
    }
};

export const deleteTicket = async (ticketId: number) => {
    try {
        const response = await fetch(`https://localhost:7278/api/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw new Error('An unexpected error occurred while fetching tickets');
    }
};