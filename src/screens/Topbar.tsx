import { Button, Classes, Navbar, NavbarDivider, NavbarGroup } from "@blueprintjs/core";
import AddObjectButton from "../components/dialogs/AddObjectButton";
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
                    <AddObjectButton />
                    <NavbarDivider />
                    <SaveButton />
                    <NavbarDivider />
                    <OpenButton />
                    <NavbarDivider />
                    <ImportLegacyButton />
                    <NavbarDivider />
                    <NewMapButton />
                </NavbarGroup>
                <NavbarGroup align="right">
                    <PublishButton />
                    <NavbarDivider />
                    <SettingsButton />
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="help" text="Help" onClick={() => { window.open("https://docs.levelimposter.net/"); }} />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}