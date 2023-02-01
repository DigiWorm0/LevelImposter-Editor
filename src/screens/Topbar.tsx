import { Navbar, NavbarDivider, NavbarGroup } from "@blueprintjs/core";
import AddLayerButton from "../components/dialogs/AddLayerButton";
import AddObjectButton from "../components/dialogs/AddObjectButton";
import CopyButton from "../components/dialogs/CopyButton";
import DeleteObjectButton from "../components/dialogs/DeleteObjectButton";
import DocsButton from "../components/dialogs/DocsButton";
import NewMapButton from "../components/dialogs/NewMapButton";
import OpenButton from "../components/dialogs/OpenButton";
import PasteButton from "../components/dialogs/PasteButton";
import RedoButton from "../components/dialogs/RedoButton";
import SaveButton from "../components/dialogs/SaveButton";
import SettingsButton from "../components/dialogs/SettingsButton";
import SignInButton from "../components/dialogs/SignInButton";
import UndoButton from "../components/dialogs/UndoButton";
import MapName from "../components/scenegraph/MapName";

export default function Topbar() {
    return (
        <div className="topbar">
            <Navbar
                className="topbar-navbar"
                fixedToTop={true}>
                <NavbarGroup>

                    <MapName />
                    <NavbarDivider />
                    <OpenButton />
                    <NewMapButton />
                    <NavbarDivider />
                    <SaveButton />
                    <NavbarDivider />
                    <AddObjectButton />
                    <AddLayerButton />
                    <DeleteObjectButton />
                    <NavbarDivider />
                    <UndoButton />
                    <RedoButton />
                    <NavbarDivider />
                    <CopyButton />
                    <PasteButton />
                </NavbarGroup>
                <NavbarGroup align="right">
                    <SignInButton />
                    <SettingsButton />
                    <DocsButton />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}