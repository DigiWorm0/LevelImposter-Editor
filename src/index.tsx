import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';

import ReactDOM from 'react-dom/client';
import App from './screens/App';
import LITheme from './Theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider theme={LITheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);