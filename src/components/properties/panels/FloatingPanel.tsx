import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function FloatingPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-blankfloat")
        return null;

    return (
        <PanelContainer title={t("floating.title") as string}>
            <NumericPanelInput
                name="floating.height"
                prop="floatingHeight"
                defaultValue={DEFAULT_FLOATING_HEIGHT}
                icon="arrows-vertical"
                min={0}
                minorStepSize={0.01}
                stepSize={0.1}
                majorStepSize={1}
            />
            <NumericPanelInput
                name="floating.speed"
                prop="floatingSpeed"
                defaultValue={DEFAULT_FLOATING_SPEED}
                icon="double-chevron-up"
                min={0}
                minorStepSize={0.01}
                stepSize={0.1}
                majorStepSize={1}
            />
        </PanelContainer>
    );
}
