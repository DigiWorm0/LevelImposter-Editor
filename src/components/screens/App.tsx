import { Provider as StateProvider } from "jotai";
import primaryStore from "../../hooks/primaryStore";
import Content from "./Content";
import { HotkeysProvider } from "react-hotkeys-hook";
import { createTheme, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
    typography: {
        h1: { fontWeight: "bold" },
        h2: { fontWeight: "bold" },
        h3: { fontWeight: "bold" },
        h4: { fontWeight: "bold" },
        h5: { fontWeight: "bold" },
        h6: { fontWeight: "bold" }
    }
});

export default function App() {

    // How many providers is too many providers?

    return (
        <StateProvider store={primaryStore}>
            <HotkeysProvider>
                <ThemeProvider theme={darkTheme}>
                    <SnackbarProvider>
                        <Content />
                    </SnackbarProvider>
                </ThemeProvider>
            </HotkeysProvider>
        </StateProvider>
    );
}
