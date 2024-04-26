export enum TicketStatus {
    ToDo = 0,
    InProgress = 1,
    Done = 2
}

export interface AlertInfo {
    type: AlertType,
    message: string,
}

export enum AlertType {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}

export interface DialogInfo {
    title: string,
    message: string,
}

export interface Ticket {
    id: number,
    title: string,
    content: string,
    status: TicketStatus,
    createdDate: string,
    updatedDate: string,
}

export interface TicketData {
    title: string,
    content: string,
    status: TicketStatus,
}

export const getStatusLabel = (status: TicketStatus | string): string => {
    switch (status) {
        case TicketStatus.ToDo:
            return 'To Do';
        case TicketStatus.InProgress:
            return 'In Progress';
        case TicketStatus.Done:
            return 'Done';
        default:
            return '';
    }

};

export const getEnumValue = (label: string | null): TicketStatus => {
    switch (label) {
        case 'To Do':
            return TicketStatus.ToDo;
        case 'In Progress':
            return TicketStatus.InProgress;
        case 'Done':
            return TicketStatus.Done;
        default:
            return TicketStatus.ToDo
    }
};