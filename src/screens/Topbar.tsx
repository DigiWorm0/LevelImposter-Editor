import { Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import React from "react";
import AddObjectButton from "../components/dialogs/AddObjectButton";
import MapName from "../components/scenegraph/MapName";
import useMap from "../hooks/useMap";

export default function Topbar() {
    const [map, setMap] = useMap();

    return (
        <div className="topbar">
            <Navbar
                className="topbar-navbar"
                fixedToTop={true}>
                <NavbarGroup>
                    <MapName />
                    <NavbarDivider />
                    <AddObjectButton />
                </NavbarGroup>
                <NavbarGroup align="right">
                    <Button className={Classes.MINIMAL} icon="cog" text="Settings" />
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="help" text="Help" onClick={() => { window.open("https://docs.levelimposter.net/"); }} />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}