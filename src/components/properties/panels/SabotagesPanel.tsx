import { useTranslation } from "react-i18next";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function SabotagesPanel() {
    const { t } = useTranslation();
    const isSabotage = useIsSelectedElemType("util-sabotages");

    if (!isSabotage)
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
