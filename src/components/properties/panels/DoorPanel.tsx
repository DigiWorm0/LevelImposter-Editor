import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/elements/useSelectedElem";
import { useElementType } from "../../../hooks/elements/useTypes";
import { MAX_DOOR_COUNT } from "../../../types/generic/Constants";
import { DoorType } from "../../../types/generic/DoorType";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import DoorTypeSelect from "../input/DoorTypeSelect";
import RoomSelect from "../input/select/RoomSelect";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";

const DOOR_OPEN_SOUND = "doorOpen";
const DOOR_CLOSE_SOUND = "doorClose";

export default function DoorPanel() {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const doorElems = useElementType("sab-door");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundType, setSelectedSoundType] = React.useState<string | undefined>(undefined);

    const doorType = React.useMemo(() => selectedElem?.properties.doorType ?? DoorType.Skeld, [selectedElem]);
    const parentRoom = React.useMemo(() => roomElems.find((e) => e.id === selectedElem?.properties.parent), [selectedElem, roomElems]);
    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_OPEN_SOUND), [sounds]);
    const hasCloseSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_CLOSE_SOUND), [sounds]);

    const isNotWav = React.useMemo(() => {
        return sounds.some((s) => !s.data?.startsWith("data:audio/wav;base64,"));
    }, [sounds]);

    if (!selectedElem || !selectedElem.type.startsWith("sab-door"))
        return null;

    return (
        <>
            <PanelContainer title={t("door.title") as string}>
                <RoomSelect useDefault={true} />
                <DoorTypeSelect />
                <ElementPropSwitch
                    name={t("door.isInteractable")}
                    prop="isDoorInteractable"
                    defaultValue={true}
                    disabled={doorType === DoorType.Skeld}
                />
                <DropdownList
                    elements={[
                        {
                            id: DOOR_OPEN_SOUND,
                            name: t(`door.${DOOR_OPEN_SOUND}`) as string,
                            icon: "VolumeUp",
                            intent: hasOpenSound ? "success" : "error",
                        },
                        {
                            id: DOOR_CLOSE_SOUND,
                            name: t(`door.${DOOR_CLOSE_SOUND}`) as string,
                            icon: "VolumeUp",
                            intent: hasCloseSound ? "success" : "error",
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
                icon="Room"
            >
                {t("door.errorNoRoom")}
            </MapError>
            <MapError
                isVisible={doorElems.length > MAX_DOOR_COUNT - 10}
            >
                {t("door.errorMaxDoors", { count: doorElems.length, max: MAX_DOOR_COUNT })}
            </MapError>
            <MapError
                isVisible={isNotWav}
                icon="VolumeMute"
            >
                {t("audio.errorNotWav")}
            </MapError>
        </>
    );
}
