import { AnchorButton, Button, ControlGroup, FormGroup, Icon, Menu } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import generateGUID from "../../hooks/generateGUID";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import DoorType from "../../types/generic/DoorType";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";
import SoundEditorPanel from "./SoundEditorPanel";
import LISound from "../../types/li/LISound";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import { useSelectedSoundID } from "../../hooks/jotai/useSelectedSound";

const TypeSelect = Select2.ofType<string>();
const DOOR_OPEN_SOUND = "doorOpen";
const DOOR_CLOSE_SOUND = "doorClose";

export default function DoorPanel() {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);
    const sounds = selectedElem?.properties.sounds || [];
    const selectedSoundName = sounds.find((s) => s.id === selectedSoundID)?.name;

    const editSound = (soundName: string) => {
        if (!selectedElem)
            return;

        const soundID = sounds.find((s) => s.name === soundName)?.id;
        if (soundID === selectedSoundID && soundID)
            setSelectedSoundID(undefined);
        else if (soundID)
            setSelectedSoundID(soundID);
        else {
            const newSound: LISound = {
                id: generateGUID(),
                name: soundName,
                data: undefined,
                volume: DEFAULT_VOLUME,
                isPreset: false
            };
            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, sounds: [...sounds, newSound] } });
            setSelectedSoundID(newSound.id);
        }
    }

    const typeSelectRenderer: ItemRenderer<string> = (type, props) => (
        <MenuItem2
            key={props.index + "-type"}
            text={t(`door.${type}`) as string}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem
        || !selectedElem.type.startsWith("sab-door"))
        return null;

    return (
        <>
            <PanelContainer title={t("door.title") as string}>
                <FormGroup>
                    <RoomSelect useDefault={true} />

                    <ControlGroup fill>
                        <TypeSelect
                            fill
                            filterable={false}
                            items={DoorType}
                            itemRenderer={typeSelectRenderer}
                            onItemSelect={(length) => {
                                setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, doorType: length } });
                            }}>

                            <Button
                                rightIcon="caret-down"
                                text={t(`door.${selectedElem.properties.doorType || "skeld"}`) as string}
                                fill
                            />
                        </TypeSelect>
                        <Tooltip2
                            intent="primary"
                            content={t("door.globalInfo") as string}>
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
                            intent={sounds.find((s) => s.name === DOOR_OPEN_SOUND) ? "success" : "danger"}
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
                            intent={sounds.find((s) => s.name === DOOR_CLOSE_SOUND) ? "success" : "danger"}
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
