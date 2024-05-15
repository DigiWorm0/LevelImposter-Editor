import { Navbar, NavbarGroup } from "@blueprintjs/core";
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

export default function Topbar() {
    return (
        <div className="topbar">
            <Navbar
                className="topbar-navbar"
                fixedToTop={true}
            >
                <NavbarGroup>
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