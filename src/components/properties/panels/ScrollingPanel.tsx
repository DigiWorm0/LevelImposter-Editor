import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { DEFAULT_SCROLL_X_SPEED, DEFAULT_SCROLL_Y_SPEED } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function ScrollingPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-blankscroll")
        return null;

    return (
        <PanelContainer title={t("scrolling.title") as string}>
            <NumericPanelInput
                name="scrolling.xspeed"
                prop="scrollingXSpeed"
                defaultValue={DEFAULT_SCROLL_X_SPEED}
                icon="SwapHoriz"
                minorStepSize={0.01}
                stepSize={0.1}
                majorStepSize={1}
            />
            <NumericPanelInput
                name="scrolling.yspeed"
                prop="scrollingYSpeed"
                defaultValue={DEFAULT_SCROLL_Y_SPEED}
                icon="SwapVert"
                minorStepSize={0.01}
                stepSize={0.1}
                majorStepSize={1}
            />
        </PanelContainer>
    );
}
