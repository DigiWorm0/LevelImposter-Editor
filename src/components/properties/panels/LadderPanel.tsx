import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { DEFAULT_LADDER_HEIGHTS } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function LadderPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || !selectedElem.type.startsWith("util-ladder"))
        return null;

    return (
        <PanelContainer title={t("ladder.title") as string}>
            <NumericPanelInput
                name="ladder.height"
                prop="ladderHeight"
                defaultValue={DEFAULT_LADDER_HEIGHTS[selectedElem.type]}
                icon="arrows-vertical"
                min={0}
                minorStepSize={0.05}
                stepSize={0.1}
                majorStepSize={0.5}
                intent="warning"
            />
        </PanelContainer>
    );
}
