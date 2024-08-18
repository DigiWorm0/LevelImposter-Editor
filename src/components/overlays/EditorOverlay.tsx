import Topbar from "../screens/Topbar";
import LeftSidebar from "../screens/LeftSidebar";
import RightSidebar from "../screens/RightSidebar";
import BrowserWarningModal from "../modals/BrowserWarningModal";
import {Box} from "@mui/material";
import BottomBar from "../screens/BottomBar";

export default function EditorOverlay() {
    return (
        <>
            {/* Column */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100vh",
                    pointerEvents: "none",
                    position: "relative",
                    zIndex: 100,
                }}
            >
                <Topbar/>

                {/* Row */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minHeight: 0,
                        flexGrow: 1,
                    }}
                >
                    <LeftSidebar/>
                    <RightSidebar/>
                </Box>

                <BottomBar/>
            </Box>
            <BrowserWarningModal/>
        </>
    );
}