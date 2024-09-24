import React from "react";
import {useTranslation} from "react-i18next";
import {MAX_DOOR_COUNT} from "../../../types/generic/Constants";
import {DoorType} from "../../../types/generic/DoorType";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import DoorTypeSelect from "../input/select/DoorTypeSelect";
import RoomSelect from "../input/select/RoomSelect";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import {useSelectedElemPropValue} from "../../../hooks/elements/useSelectedElemProperty";
import {useElementValue} from "../../../hooks/elements/useElements";
import useElementTypeCount from "../../../hooks/elements/useElementTypeCount";
import {Room, VolumeUp} from "@mui/icons-material";

const DOOR_OPEN_SOUND = "doorOpen";
const DOOR_CLOSE_SOUND = "doorClose";

export default function DoorPanel() {
    const {t} = useTranslation();

    const doorElemCount = useElementTypeCount("sab-door");

    const doorType = useSelectedElemPropValue("doorType") ?? DoorType.Skeld;
    const parentRoomID = useSelectedElemPropValue("parent");
    const sounds = useSelectedElemPropValue("sounds") || [];
    const parentRoom = useElementValue(parentRoomID);

    const isDoorV = useIsSelectedElemType("sab-doorv");
    const isDoorH = useIsSelectedElemType("sab-doorh");

    const [selectedSoundType, setSelectedSoundType] = React.useState<string | undefined>(undefined);

    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_OPEN_SOUND), [sounds]);
    const hasCloseSound = React.useMemo(() => sounds.some((s) => s.type === DOOR_CLOSE_SOUND), [sounds]);

    if (!isDoorV && !isDoorH)
        return null;

    return (
        <>
            <PanelContainer title={t("door.title") as string}>
                <RoomSelect useDefault={true}/>
                <DoorTypeSelect/>
                <ElementPropSwitch
                    name={t("door.defaultClosed")}
                    prop="isDoorClosed"
                    defaultValue={false}
                />
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
                            icon: <VolumeUp/>,
                            intent: hasOpenSound ? "success" : "error",
                        },
                        {
                            id: DOOR_CLOSE_SOUND,
                            name: t(`door.${DOOR_CLOSE_SOUND}`) as string,
                            icon: <VolumeUp/>,
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
                isVisible={!parentRoom}
                icon={<Room/>}
            >
                {t("door.errorNoRoom")}
            </MapError>
            <MapError
                isVisible={doorElemCount > MAX_DOOR_COUNT - 10}
            >
                {t("door.errorMaxDoors", {count: doorElemCount, max: MAX_DOOR_COUNT})}
            </MapError>
        </>
    );
}
