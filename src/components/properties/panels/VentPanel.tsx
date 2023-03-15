import { Divider } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useSelectedSoundID } from "../../../hooks/jotai/useSelectedSound";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import LISound from "../../../types/li/LISound";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import VentSelect from "../input/VentSelect";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

const VENT_OPEN_SOUND = "ventOpen";
const VENT_MOVE_SOUND = "ventMove";

export default function VentPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const selectedSoundType = React.useMemo(() => sounds.find((s) => s.id === selectedSoundID)?.type, [selectedSoundID, sounds]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === VENT_OPEN_SOUND), [sounds]);
    const hasMoveSound = React.useMemo(() => sounds.some((s) => s.type === VENT_MOVE_SOUND), [sounds]);

    const selectSoundName = React.useCallback((soundName?: string) => {
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

    if (!selectedElem
        || !selectedElem.type.startsWith("util-vent"))
        return null;

    return (
        <>
            <PanelContainer title={t("vent.title") as string}>
                <VentSelect
                    prop="leftVent"
                />
                <VentSelect
                    prop="middleVent"
                />
                <VentSelect
                    prop="rightVent"
                />
                {selectedElem.type === "util-vent1" && (
                    <>
                        <Divider />
                        <DropdownList
                            elements={[
                                {
                                    name: t(`vent.${VENT_OPEN_SOUND}`) as string,
                                    id: VENT_OPEN_SOUND,
                                    intent: hasOpenSound ? "success" : "danger",
                                    icon: hasOpenSound ? "volume-up" : "volume-off"
                                },
                                {
                                    name: t(`vent.${VENT_MOVE_SOUND}`) as string,
                                    id: VENT_MOVE_SOUND,
                                    intent: hasMoveSound ? "success" : "danger",
                                    icon: hasMoveSound ? "volume-up" : "volume-off"
                                },
                            ]}
                            selectedID={selectedSoundType}
                            onSelectID={selectSoundName}
                        >
                            <SoundEditorPanel
                                title={t(`vent.${selectedSoundType}`) as string}
                            />
                        </DropdownList>
                    </>
                )}
            </PanelContainer>
            <MapError isVisible={selectedElem.type === "util-vent2"} info icon="volume-up">
                {t("vent.ventSoundInfo")}
            </MapError>
        </>
    );
}
