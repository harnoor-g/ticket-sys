import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import TicketDashboard from './components/TicketDashboard';


const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <TicketDashboard/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
