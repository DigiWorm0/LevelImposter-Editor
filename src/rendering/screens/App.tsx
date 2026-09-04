import Content from "./Content";
import {HotkeysProvider} from "react-hotkeys-hook";
import {createTheme, ThemeProvider} from "@mui/material";
import {SnackbarProvider} from "notistack";
import React, {StrictMode} from "react";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
    typography: {
        h1: {fontWeight: "bold"},
        h2: {fontWeight: "bold"},
        h3: {fontWeight: "bold"},
        h4: {fontWeight: "bold"},
        h5: {fontWeight: "bold"},
        h6: {fontWeight: "bold"}
    }
});

export default function App() {

    // Hide splash screen
    React.useEffect(() => {
        const splash = document.getElementById("splashscreen");
        if (!splash) return;

        // Fade out the splash screen
        splash.style.opacity = "0";

        // Remove from DOM after fade out
        setTimeout(() => {
            splash.style.display = "none";
        }, 2000);
    }, []);

    // How many providers is too many providers?

    return (
        <StrictMode>
            {/* The empty scope prevents the default behavior of enabling all scopes */}
            <HotkeysProvider initiallyActiveScopes={[""]}>
                <ThemeProvider theme={darkTheme}>
                    <SnackbarProvider>
                        <Content/>
                    </SnackbarProvider>
                </ThemeProvider>
            </HotkeysProvider>
        </StrictMode>
    );
}
