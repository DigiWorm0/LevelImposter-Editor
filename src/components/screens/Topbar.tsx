import { Navbar, NavbarDivider, NavbarGroup } from "@blueprintjs/core";
import AddLayerButton from "../dialogs/AddLayerButton";
import AddObjectButton from "../dialogs/AddObjectButton";
import CopyButton from "../dialogs/CopyButton";
import DeleteObjectButton from "../dialogs/DeleteObjectButton";
import NewMapButton from "../dialogs/NewMapButton";
import OpenButton from "../dialogs/OpenButton";
import PasteButton from "../dialogs/PasteButton";
import RedoButton from "../dialogs/RedoButton";
import SaveButton from "../dialogs/SaveButton";
import SignInButton from "../dialogs/SignInButton";
import UndoButton from "../dialogs/UndoButton";
import MapName from "../scenegraph/MapName";
import DebugTextBox from "../dialogs/DebugTextBox";
import MapAssetsButton from "../dialogs/MapAssetsButton";
import SettingsButton from "../dialogs/SettingsButton";
import MapPropertiesButton from "../dialogs/MapPropertiesButton";

export default function Topbar() {
    return (
        <div className="topbar">
            <Navbar
                className="topbar-navbar"
                fixedToTop={true}
            >
                <NavbarGroup>
                    <MapName />
                    <NavbarDivider />
                    <OpenButton />
                    <NewMapButton />
                    <SaveButton />
                    <NavbarDivider />
                    <AddObjectButton />
                    <AddLayerButton />
                    <NavbarDivider />
                    <UndoButton />
                    <RedoButton />
                    <NavbarDivider />
                    <CopyButton />
                    <PasteButton />
                    <DeleteObjectButton />
                    <NavbarDivider />
                    {/*<MagicButton />*/}
                    <MapAssetsButton />
                    <DebugTextBox />
                </NavbarGroup>
                <NavbarGroup align="right">
                    <SignInButton />
                    <MapPropertiesButton />
                    <SettingsButton />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}