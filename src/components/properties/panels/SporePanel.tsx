import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { DEFAULT_SPORE_GAS_RANGE, DEFAULT_SPORE_RANGE } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";
import ColorPanelInput from "../input/ColorPanelInput";

export default function SporePanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-spore")
        return null;

    return (
        <>
            <PanelContainer title={t("spore.title") as string}>
                <NumericPanelInput
                    name="spore.activateRange"
                    prop="range"
                    defaultValue={DEFAULT_SPORE_RANGE}
                    icon="ring"
                    min={0}
                    minorStepSize={0.05}
                    stepSize={0.1}
                    majorStepSize={0.5}
                    intent="warning"
                />
                <NumericPanelInput
                    name="spore.gasRange"
                    prop="sporeRange"
                    defaultValue={DEFAULT_SPORE_GAS_RANGE}
                    icon="ring"
                    min={0}
                    minorStepSize={0.05}
                    stepSize={0.1}
                    majorStepSize={0.5}
                    intent="primary"
                />
                <ColorPanelInput
                    name={t("spore.gasColor") as string}
                    prop="gasColor"
                    defaultValue={{ r: 221, g: 0, b: 217, a: 0.498 }} // Purple
                />
            </PanelContainer>
        </>
    );
}
