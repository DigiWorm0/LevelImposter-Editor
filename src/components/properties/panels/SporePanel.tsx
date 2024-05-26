import { useTranslation } from "react-i18next";
import { DEFAULT_SPORE_GAS_RANGE, DEFAULT_SPORE_RANGE } from "../../../types/generic/Constants";
import ElementPropColorInput from "../input/elementProps/ElementPropColorInput";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function SporePanel() {
    const { t } = useTranslation();
    const isSpore = useIsSelectedElemType("util-spore");

    if (!isSpore)
        return null;

    return (
        <>
            <PanelContainer title={t("spore.title") as string}>
                <ElementPropNumericInput
                    name={t("spore.activateRange")}
                    prop="range"
                    defaultValue={DEFAULT_SPORE_RANGE}
                    icon="TripOrigin"
                    min={0}
                    stepSize={0.1}
                    color="warning"
                />
                <ElementPropNumericInput
                    name={t("spore.gasRange")}
                    prop="sporeRange"
                    defaultValue={DEFAULT_SPORE_GAS_RANGE}
                    icon="TripOrigin"
                    min={0}
                    stepSize={0.1}
                    color="primary"
                />
                <ElementPropColorInput
                    name={t("spore.gasColor") as string}
                    prop="gasColor"
                    defaultValue={{ r: 221, g: 0, b: 217, a: 0.498 }} // Purple
                />
            </PanelContainer>
        </>
    );
}
