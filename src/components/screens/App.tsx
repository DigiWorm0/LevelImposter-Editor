import { Provider as StateProvider } from 'jotai';
import primaryStore from '../../hooks/primaryStore';
import Content from './Content';
import { HotkeysProvider } from "react-hotkeys-hook";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {

    return (
        <StateProvider store={primaryStore}>
            <HotkeysProvider>
                <ThemeProvider theme={darkTheme}>
                    <Content />
                </ThemeProvider>
            </HotkeysProvider>
        </StateProvider>
    );
}
