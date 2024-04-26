import React, { useState, createContext } from 'react';

interface DashboardStateContextType {
    isEditBtnDisabled: boolean,
    setEditBtnDisabled: (value: boolean) => void,
    isDeleteBtnDisabled: boolean,
    setDeleteBtnDisabled: (value: boolean) => void,
    showAlert: boolean,
    setShowAlert: (value: boolean) => void,
    showDialog: boolean,
    setShowDialog: (value: boolean) => void,
} 

interface DashboardStateProviderProps {
    children: React.ReactNode
}

export const DashboardStateContext = createContext<DashboardStateContextType>({} as DashboardStateContextType);

export const DashboardStateProvider = ({ children }: DashboardStateProviderProps) => {
    const [isEditBtnDisabled, setEditBtnDisabled] = useState(true);
    const [isDeleteBtnDisabled, setDeleteBtnDisabled] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <DashboardStateContext.Provider value={{
            isEditBtnDisabled,
            setEditBtnDisabled,
            isDeleteBtnDisabled,
            setDeleteBtnDisabled,
            showAlert,
            setShowAlert,
            showDialog,
            setShowDialog,
        }}>
            {children}
        </DashboardStateContext.Provider>
    );
};