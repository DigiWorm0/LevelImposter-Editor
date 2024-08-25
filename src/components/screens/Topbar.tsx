import AddLayerButton from "../buttons/AddLayerButton";
import AddObjectButton from "../buttons/AddObjectButton";
import CopyButton from "../buttons/CopyButton";
import DeleteObjectButton from "../buttons/DeleteObjectButton";
import NewMapButton from "../buttons/NewMapButton";
import OpenMapButton from "../buttons/OpenMapButton";
import PasteButton from "../buttons/PasteButton";
import RedoButton from "../buttons/RedoButton";
import SaveMapButton from "../buttons/SaveMapButton";
import SignInButton from "../buttons/SignInButton";
import UndoButton from "../buttons/UndoButton";
import MapName from "../scenegraph/MapName";
import MapAssetsButton from "../buttons/MapAssetsButton";
import SettingsButton from "../buttons/SettingsButton";
import MapPropertiesButton from "../buttons/MapPropertiesButton";
import {Paper, Typography} from "@mui/material";
import NavDivider from "./NavDivider";
import MapPublishButton from "../buttons/MapPublishButton";
import useSetFocus, {Scope} from "../../hooks/input/useFocus";

export default function Topbar() {
    const setFocus = useSetFocus();
    return (
        <Paper
            elevation={1}
            square
            sx={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "5px 20px",
                overflowX: "hidden",
                overflowY: "auto",
                pointerEvents: "auto",
                boxShadow: "0 4px 4px rgba(0,0,0,0.2)",
                zIndex: 2
            }}
            onMouseDown={() => setFocus(Scope.Navigation)}
        >
            <MapName/>

            <NavDivider/>
            <OpenMapButton/>
            <NewMapButton/>
            <SaveMapButton/>
            <NavDivider/>
            <AddObjectButton/>
            <AddLayerButton/>
            <NavDivider/>
            <UndoButton/>
            <RedoButton/>
            <NavDivider/>
            <CopyButton/>
            <PasteButton/>
            <DeleteObjectButton/>
            <NavDivider/>
            <MapAssetsButton/>

            <Typography sx={{flexGrow: 1}}/>

            <SignInButton/>
            <MapPublishButton/>
            <MapPropertiesButton/>
            <SettingsButton/>

        </Paper>
    );
}