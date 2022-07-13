import { Button, Classes, Navbar, NavbarDivider, NavbarGroup } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import AddObjectButton from "../components/dialogs/AddObjectButton";
import DeleteObjectButton from "../components/dialogs/DeleteObjectButton";
import ImportLegacyButton from "../components/dialogs/ImportLegacyButton";
import NewMapButton from "../components/dialogs/NewMapButton";
import OpenButton from "../components/dialogs/OpenButton";
import PublishButton from "../components/dialogs/PublishButton";
import SaveButton from "../components/dialogs/SaveButton";
import SettingsButton from "../components/dialogs/SettingsButton";
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
                    <SaveButton />
                    <OpenButton />
                    <NewMapButton />
                    <NavbarDivider />
                    <AddObjectButton />
                    <DeleteObjectButton />
                    <NavbarDivider />
                    <ImportLegacyButton />

                </NavbarGroup>
                <NavbarGroup align="right">
                    <PublishButton />
                    <SettingsButton />
                    <Tooltip2
                        content="Open Documentation"
                        position="bottom">
                        <Button
                            className={Classes.MINIMAL}
                            icon="help"
                            onClick={() => { window.open("https://docs.levelimposter.net/"); }} />
                    </Tooltip2>
                </NavbarGroup>
            </Navbar>
        </div>
    );
}