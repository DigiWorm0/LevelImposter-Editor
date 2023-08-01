import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import PanelContainer from "../util/PanelContainer";

export default function SabotagesPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || selectedElem.type !== "util-sabotages")
        return null;

    return (
        <>
            <PanelContainer title={t("sabotages.title") as string}>
                <SoundEditorPanel
                    title={t("sabotages.sound") as string}
                    soundType="sabotageSound"
                    defaultSoundURL="sabotageSound.wav"
                />
            </PanelContainer>
        </>
    );
}
