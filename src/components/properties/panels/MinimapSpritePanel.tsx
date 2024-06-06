import { useTranslation } from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function MinimapSpritePanel() {
    const { t } = useTranslation();
    const isMinimapSprite = useIsSelectedElemType("util-minimapsprite");

    if (!isMinimapSprite)
        return null;

    return (
        <PanelContainer title={t("minimap.minimapSprite") as string}>
            <ElementPropSwitch
                name={t("minimap.imposterOnly")}
                prop="imposterOnly"
                defaultValue={false}
            />
        </PanelContainer>
    );
}
