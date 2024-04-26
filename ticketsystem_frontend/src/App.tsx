import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import TicketDashboard from './components/TicketDashboard';
import { DashboardStateProvider } from './context/DashboardContext';


const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <DashboardStateProvider>
                    <TicketDashboard/>
                </DashboardStateProvider>
            </Box>
        </ThemeProvider>
    );
}

export default App;
