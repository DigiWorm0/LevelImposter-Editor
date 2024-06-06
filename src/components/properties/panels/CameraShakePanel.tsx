import { useTranslation } from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";

export default function CameraShakePanel() {
    const { t } = useTranslation();
    const isShake = useIsSelectedElemType("util-triggershake");

    if (!isShake)
        return null;

    return (
        <PanelContainer title={t("triggershake.title") as string}>
            <ElementPropNumericInput
                prop={"shakeAmount"}
                name={t("triggershake.shakeAmount")}
                defaultValue={0.03}
                stepSize={0.01}
                min={0}
            />
            <ElementPropNumericInput
                prop={"shakePeriod"}
                name={t("triggershake.shakePeriod")}
                defaultValue={400}
                stepSize={10}
                min={0}
            />
        </PanelContainer>
    );
}
