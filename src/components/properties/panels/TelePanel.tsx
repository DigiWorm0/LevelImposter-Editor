import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
import SwitchPanelInput from "../input/SwitchPanelInput";
import TeleSelect from "../input/TeleSelect";
import PanelContainer from "../util/PanelContainer";

export default function TelePanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-tele")
        return null;

    return (
        <PanelContainer title={t("tele.title") as string}>
            <TeleSelect />
            <SwitchPanelInput
                prop={"preserveOffset"}
                name={"tele.preserveOffset"}
                defaultValue={true}
                tooltip={"tele.preserveOffsetTooltip"}
            />
            <SwitchPanelInput
                prop={"isGhostEnabled"}
                name={"tele.ghostEnabled"}
                defaultValue={true}
                tooltip={"tele.ghostEnabledTooltip"}
            />
        </PanelContainer>
    );
}
