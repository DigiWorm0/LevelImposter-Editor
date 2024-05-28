import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import VentSelect from "../input/select/VentSelect";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import { VolumeDown, VolumeUp } from "@mui/icons-material";

const VENT_OPEN_SOUND = "ventOpen";
const VENT_MOVE_SOUND = "ventMove";

export default function VentPanel() {
    const { t } = useTranslation();
    const isVent1 = useIsSelectedElemType("util-vent1");
    const isVent2 = useIsSelectedElemType("util-vent2");
    const isVent3 = useIsSelectedElemType("util-vent3");
    const sounds = useSelectedElemPropValue("sounds") ?? [];
    const [selectedSoundType, setSelectedSoundType] = React.useState<string | undefined>(undefined);

    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === VENT_OPEN_SOUND), [sounds]);
    const hasMoveSound = React.useMemo(() => sounds.some((s) => s.type === VENT_MOVE_SOUND), [sounds]);

    if (!isVent1 && !isVent2 && !isVent3)
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
                {isVent1 && (
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
                                    icon: hasOpenSound ? <VolumeUp /> : <VolumeDown />
                                },
                                {
                                    name: t(`vent.${VENT_MOVE_SOUND}`) as string,
                                    id: VENT_MOVE_SOUND,
                                    intent: hasOpenSound ? "success" : "error",
                                    icon: hasOpenSound ? <VolumeUp /> : <VolumeDown />
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
                isVisible={isVent2}
                info
                icon={<VolumeUp />}
            >
                {t("vent.ventSoundInfo")}
            </MapError>
        </>
    );
}
