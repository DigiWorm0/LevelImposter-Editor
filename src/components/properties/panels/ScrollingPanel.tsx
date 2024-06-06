import { useTranslation } from "react-i18next";
import { DEFAULT_SCROLL_X_SPEED, DEFAULT_SCROLL_Y_SPEED } from "../../../types/generic/Constants";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { SwapHoriz, SwapVert } from "@mui/icons-material";

export default function ScrollingPanel() {
    const { t } = useTranslation();
    const isScroll = useIsSelectedElemType("util-blankscroll");

    if (!isScroll)
        return null;
    return (
        <PanelContainer title={t("scrolling.title") as string}>
            <ElementPropNumericInput
                name={t("scrolling.xspeed")}
                prop="scrollingXSpeed"
                defaultValue={DEFAULT_SCROLL_X_SPEED}
                icon={<SwapHoriz />}
                stepSize={0.1}
            />
            <ElementPropNumericInput
                name={t("scrolling.yspeed")}
                prop="scrollingYSpeed"
                defaultValue={DEFAULT_SCROLL_Y_SPEED}
                icon={<SwapVert />}
                stepSize={0.1}
            />
        </PanelContainer>
    );
}
