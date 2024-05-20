import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import VentSelect from "../input/VentSelect";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import { Typography } from "@mui/material";

const VENT_OPEN_SOUND = "ventOpen";
const VENT_MOVE_SOUND = "ventMove";

export default function VentPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundType, setSelectedSoundType] = React.useState<string | undefined>(undefined);

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === VENT_OPEN_SOUND), [sounds]);
    const hasMoveSound = React.useMemo(() => sounds.some((s) => s.type === VENT_MOVE_SOUND), [sounds]);

    const isNotWav = React.useMemo(() => {
        return sounds.some((s) => !s.data?.startsWith("data:audio/wav;base64,"));
    }, [sounds]);

    if (!selectedElem
        || !selectedElem.type.startsWith("util-vent"))
        return null;

    return (
        <>
            <PanelContainer title={t("vent.title")}>
                <Typography variant={"subtitle2"} sx={{ ms: 1 }}>
                    {t("vent.connections")}
                </Typography>
                <VentSelect prop="leftVent" />
                <VentSelect prop="middleVent" />
                <VentSelect prop="rightVent" />
                {selectedElem.type === "util-vent1" && (
                    <>
                        <Typography variant={"subtitle2"} sx={{ mt: 2, ms: 1 }}>
                            {t("vent.sounds")}
                        </Typography>
                        <DropdownList
                            elements={[
                                {
                                    name: t(`vent.${VENT_OPEN_SOUND}`) as string,
                                    id: VENT_OPEN_SOUND,
                                    intent: hasOpenSound ? "success" : "error",
                                    icon: hasOpenSound ? "VolumeUp" : "VolumeDown"
                                },
                                {
                                    name: t(`vent.${VENT_MOVE_SOUND}`) as string,
                                    id: VENT_MOVE_SOUND,
                                    intent: hasOpenSound ? "success" : "error",
                                    icon: hasOpenSound ? "VolumeUp" : "VolumeDown"
                                },
                            ]}
                            selectedID={selectedSoundType}
                            onSelectID={setSelectedSoundType}
                            renderElement={(e) => (
                                <SoundEditorPanel
                                    title={t(`vent.${e.id}`) as string}
                                    soundType={e.id}
                                    onFinish={() => setSelectedSoundType(undefined)}
                                />
                            )}
                        />
                    </>
                )}
            </PanelContainer>
            <MapError
                isVisible={selectedElem.type === "util-vent2"}
                info
                icon="VolumeUp"
            >
                {t("vent.ventSoundInfo")}
            </MapError>
            <MapError
                isVisible={isNotWav}
                icon="VolumeMute"
            >
                {t("audio.errorNotWav") as string}
            </MapError>
        </>
    );
}
