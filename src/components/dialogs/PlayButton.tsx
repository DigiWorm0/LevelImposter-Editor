import { Button, Callout, Classes, Dialog, Icon, IconSize } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useMapName } from "../../hooks/jotai/useMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";
import DocsButton from "./DocsButton";
import SaveButton from "./SaveButton";

export default function PlayButton() {
    const tranlation = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [mapName] = useMapName();

    return (
        <>
            <Tooltip2
                content={"Launch Map"}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon={"play"}
                    onClick={() => { setIsOpen(true) }}
                />

            </Tooltip2>

            <Dialog
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                title={mapName}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }}>
                    <h2 style={{ marginTop: 0 }}>
                        <Icon icon="desktop" size={IconSize.LARGE} style={{ marginRight: 5 }} /> How to Install
                    </h2>
                    <ol>
                        <li>Download and install the <a href="https://github.com/DigiWorm0/LevelImposter/releases">LevelImposter Mod</a> <i>(If you haven't already)</i></li>
                        <li>Save the map LIM file: <br /><SaveButton isButton={true} /></li>
                        <li>Open Among Us</li>
                        <li>Go to <code>Maps {">>>"} Open Folder</code></li>
                        <li>Save the map LIM file in the folder</li>
                        <li>Go back to Among Us and re-open the Maps menu</li>
                    </ol>

                    <h2 style={{ marginTop: 25 }}>
                        <Icon icon="play" size={IconSize.LARGE} style={{ marginRight: 5 }} /> How to Play
                    </h2>
                    <h3>Freeplay</h3>
                    <ol>
                        <li>Open Among Us</li>
                        <li><code>Go to Maps {">>>"} {mapName}</code></li>
                        <li>Select the map's play button</li>
                    </ol>

                    <h3>Multiplayer</h3>
                    <Callout intent={"primary"} title={"Note"} icon={"info-sign"}>
                        <p>
                            Multiplayer requires the map is published and all players have the LevelImposter Mod installed.
                            The map will be synced to all players when they join the game.
                        </p>
                    </Callout>
                    <ol>
                        <li>Start an Among Us lobby under any map</li>
                        <li>Open lobby settings</li>
                        <li>Select the map from the selector</li>
                    </ol>

                    <Tooltip2
                        fill
                        content="Open Documentation"
                        position="bottom">
                        <Button
                            fill
                            icon="share"
                            text="More Details"
                            intent="primary"
                            onClick={() => { window.open("https://docs.levelimposter.net/en/latest/about/getting-started.html"); }} />
                    </Tooltip2>
                </div>
            </Dialog>

        </>
    );
}