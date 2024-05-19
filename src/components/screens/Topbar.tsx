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
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
    return (
        <div className="topbar">
            <AppBar
                className="topbar-navbar"
            >
                <Toolbar
                    style={{ minHeight: 50 }}
                >
                    <MapName />
                    <OpenMapButton />
                    <NewMapButton />
                    <SaveMapButton />
                    <AddObjectButton />
                    <AddLayerButton />
                    <UndoButton />
                    <RedoButton />
                    <CopyButton />
                    <PasteButton />
                    <DeleteObjectButton />
                    <MapAssetsButton />

                    <Typography sx={{ flexGrow: 1 }} />

                    <SignInButton />
                    <MapPropertiesButton />
                    <SettingsButton />
                </Toolbar>

            </AppBar>
        </div>
    );
}