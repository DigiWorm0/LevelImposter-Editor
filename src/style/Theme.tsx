import { createTheme } from '@mui/material/styles';


const LITheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#61dafb',
            light: '#61dafb',
            dark: '#21a1c4',
        },
        secondary: {
            main: '#b5ecfb',
            light: '#61dafb',
            dark: '#21a1c4',
        },
        background: {
            default: '#1c1f24',
            paper: "#282c34"
        },
        text: {
            primary: '#fff',
            secondary: '#fff',
        }
    },
});

export default LITheme;