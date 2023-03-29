import { AnchorButton, Button, ControlGroup, FormGroup } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../../hooks/jotai/useTypes";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import DoorTypeSelect from "../input/DoorTypeSelect";
import RoomSelect from "../input/RoomSelect";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

const DOOR_OPEN_SOUND = "doorOpen";
const DOOR_CLOSE_SOUND = "doorClose";

export default function DoorPanel() {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundType, setSelectedSoundType] = React.useState<string | undefined>(undefined);

    const parentRoom = React.useMemo(() => roomElems.find((e) => e.id === selectedElem?.properties.parent), [selectedElem, roomElems]);
    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_OPEN_SOUND), [sounds]);
    const hasCloseSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_CLOSE_SOUND), [sounds]);

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
                <RoomSelect useDefault={true} />
                <DoorTypeSelect />
                <DropdownList
                    elements={[
                        {
                            id: DOOR_OPEN_SOUND,
                            name: t(`door.${DOOR_OPEN_SOUND}`) as string,
                            icon: "volume-up",
                            intent: hasOpenSound ? "success" : "danger",
                        },
                        {
                            id: DOOR_CLOSE_SOUND,
                            name: t(`door.${DOOR_CLOSE_SOUND}`) as string,
                            icon: "volume-up",
                            intent: hasCloseSound ? "success" : "danger",
                        }
                    ]}
                    selectedID={selectedSoundType}
                    onSelectID={setSelectedSoundType}
                    renderElement={(e) => (
                        <SoundEditorPanel
                            title={e.name}
                            soundType={e.id}
                            onFinish={() => setSelectedSoundType(undefined)}
                        />
                    )}
                />
            </PanelContainer>
            <MapError
                isVisible={parentRoom === undefined}
                icon="map-marker"
            >
                {t("door.errorNoRoom")}
            </MapError>
        </>
    );
}
