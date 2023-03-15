import { AnchorButton, Button, ControlGroup, FormGroup, Menu } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useSelectedSoundID } from "../../../hooks/jotai/useSelectedSound";
import { useElementType } from "../../../hooks/jotai/useTypes";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import DoorType from "../../../types/generic/DoorType";
import LISound from "../../../types/li/LISound";
import RoomSelect from "../input/RoomSelect";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

const DOOR_OPEN_SOUND = "doorOpen";
const DOOR_CLOSE_SOUND = "doorClose";

export default function DoorPanel() {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();

    const parentRoom = React.useMemo(() => roomElems.find((e) => e.id === selectedElem?.properties.parent), [selectedElem, roomElems]);
    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const selectedSoundName = React.useMemo(() => sounds.find((s) => s.id === selectedSoundID)?.type, [selectedSoundID, sounds]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_OPEN_SOUND), [sounds]);
    const hasCloseSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_CLOSE_SOUND), [sounds]);

    const editSound = React.useCallback((soundName: string) => {
        if (!selectedElem)
            return;

        const soundID = sounds.find((s) => s.type === soundName)?.id;
        if (soundID === selectedSoundID && soundID)
            setSelectedSoundID(undefined);
        else if (soundID)
            setSelectedSoundID(soundID);
        else {
            const newSound: LISound = {
                id: generateGUID(),
                type: soundName,
                data: undefined,
                volume: DEFAULT_VOLUME,
                isPreset: false
            };
            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, sounds: [...sounds, newSound] } });
            setSelectedSoundID(newSound.id);
        }
    }, [selectedElem, selectedSoundID, setSelectedElem, setSelectedSoundID, sounds]);

    const typeSelectRenderer: ItemRenderer<string> = (type, props) => (
        <MenuItem2
            key={props.index + "-type"}
            text={t(`door.${type}`) as string}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem || !selectedElem.type.startsWith("sab-door"))
        return null;

    return (
        <>
            <PanelContainer title={t("door.title") as string}>
                <FormGroup>
                    <RoomSelect useDefault={true} />

                    <ControlGroup fill>
                        <Select2
                            fill
                            filterable={false}
                            items={DoorType}
                            itemRenderer={typeSelectRenderer}
                            onItemSelect={(length) => {
                                setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, doorType: length } });
                            }}
                        >
                            <Button
                                rightIcon="caret-down"
                                text={t(`door.${selectedElem.properties.doorType || "skeld"}`) as string}
                                fill
                            />
                        </Select2>
                        <Tooltip2
                            intent="primary"
                            content={t("door.globalInfo") as string}
                        >
                            <AnchorButton
                                minimal
                                rightIcon="globe-network"
                                intent="primary"
                            />
                        </Tooltip2>
                    </ControlGroup>
                </FormGroup>
                <Menu>
                    <div>
                        <MenuItem2
                            icon="volume-up"
                            onClick={() => editSound(DOOR_OPEN_SOUND)}
                            active={selectedSoundName === DOOR_OPEN_SOUND}
                            text={t(`door.${DOOR_OPEN_SOUND}`) as string}
                            intent={hasOpenSound ? "success" : "danger"}
                        />

                        {selectedSoundName === DOOR_OPEN_SOUND && (
                            <SoundEditorPanel
                                title={t(`door.${DOOR_OPEN_SOUND}`) as string}
                            />
                        )}
                    </div>
                    <div>
                        <MenuItem2
                            icon="volume-up"
                            onClick={() => editSound(DOOR_CLOSE_SOUND)}
                            active={selectedSoundName === DOOR_CLOSE_SOUND}
                            text={t(`door.${DOOR_CLOSE_SOUND}`) as string}
                            intent={hasCloseSound ? "success" : "danger"}
                        />

                        {selectedSoundName === DOOR_CLOSE_SOUND && (
                            <SoundEditorPanel
                                title={t(`door.${DOOR_CLOSE_SOUND}`) as string}
                            />
                        )}
                    </div>
                </Menu>
            </PanelContainer>
            <MapError isVisible={parentRoom === undefined}>
                {t("door.errorNoRoom")}
            </MapError>
        </>
    );
}
