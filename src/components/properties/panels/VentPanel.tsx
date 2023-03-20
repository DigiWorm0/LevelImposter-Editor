import { H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
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
    const [selectedSoundType, setSelectedSoundType] = React.useState<string | undefined>(undefined);

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === VENT_OPEN_SOUND), [sounds]);
    const hasMoveSound = React.useMemo(() => sounds.some((s) => s.type === VENT_MOVE_SOUND), [sounds]);

    if (!selectedElem
        || !selectedElem.type.startsWith("util-vent"))
        return null;

    return (
        <>
            <PanelContainer title={t("vent.title") as string}>
                <H6 style={{ marginTop: 5, marginLeft: 5 }}>
                    {t("vent.connections")}
                </H6>
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
                        <H6 style={{ marginTop: 10, marginLeft: 5 }}>
                            {t("vent.sounds")}
                        </H6>
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
                            onSelectID={setSelectedSoundType}
                            renderElement={(e) => (
                                <SoundEditorPanel
                                    title={t(`vent.${e.id}`) as string}
                                    soundType={e.id}
                                    onFinished={() => setSelectedSoundType(undefined)}
                                />
                            )}
                        />
                    </>
                )}
            </PanelContainer>
            <MapError isVisible={selectedElem.type === "util-vent2"} info icon="volume-up">
                {t("vent.ventSoundInfo")}
            </MapError>
        </>
    );
}
