import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import SwitchPanelInput from "../input/SwitchPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function MinimapSpritePanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-minimapsprite")
        return null;

    return (
        <PanelContainer title={t("minimap.minimapSprite") as string}>
            <SwitchPanelInput
                name="minimap.imposterOnly"
                prop="imposterOnly"
                defaultValue={false}
            />
        </PanelContainer>
    );
}
