import React from "react";
import { useTranslation } from "react-i18next";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import SoundUpload from "../util/SoundUpload";
import useSelectedElemProp, { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { HighlightAlt, VolumeOff } from "@mui/icons-material";

export default function SoundPanel() {
    const { t } = useTranslation();
    const [sounds, setSounds] = useSelectedElemProp("sounds");
    const colliders = useSelectedElemPropValue("colliders");
    const isSound = useIsSelectedElemType("util-sound1");
    const isTriggerSound = useIsSelectedElemType("util-triggersound");

    const sound = sounds?.[0] ?? undefined;
    const hasCollider = (colliders?.length ?? 0) > 0;

    if (!isSound && !isTriggerSound)
        return null;

    return (
        <>
            <PanelContainer title={t("audio.soundPlayer")}>
                <SoundUpload
                    title={""}
                    sound={sound}
                    onChange={(newSound) => setSounds([newSound])}
                    onReset={() => setSounds([])}
                    loop
                    editChannel={isTriggerSound}
                />
            </PanelContainer>
            <MapError
                isVisible={!hasCollider}
                icon={<HighlightAlt />}
            >
                {t("audio.errorNoCollider")}
            </MapError>
            <MapError
                isVisible={!sound}
                icon={<VolumeOff />}
            >
                {t("audio.errorNoSound")}
            </MapError>
        </>
    );
}
