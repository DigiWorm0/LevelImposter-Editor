import { useTranslation } from "react-i18next";
import TeleSelect from "../input/select/TeleSelect";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function TelePanel() {
    const { t } = useTranslation();
    const isTele = useIsSelectedElemType("util-tele");

    if (!isTele)
        return null;

    return (
        <PanelContainer title={t("tele.title") as string}>
            <TeleSelect />
            <ElementPropSwitch
                prop={"preserveOffset"}
                name={t("tele.preserveOffset")}
                defaultValue={true}
                tooltip={t("tele.preserveOffsetTooltip")}
            />
            <ElementPropSwitch
                prop={"isGhostEnabled"}
                name={t("tele.ghostEnabled")}
                defaultValue={true}
                tooltip={t("tele.ghostEnabledTooltip")}
            />
        </PanelContainer>
    );
}
