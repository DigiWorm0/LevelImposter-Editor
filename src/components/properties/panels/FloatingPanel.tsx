import { useTranslation } from "react-i18next";
import { DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED } from "../../../types/generic/Constants";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { Speed, SwapVert } from "@mui/icons-material";

export default function FloatingPanel() {
    const { t } = useTranslation();
    const isFloat = useIsSelectedElemType("util-blankfloat");

    if (!isFloat)
        return null;
    return (
        <PanelContainer title={t("floating.title") as string}>
            <ElementPropNumericInput
                name={t("floating.height")}
                prop="floatingHeight"
                defaultValue={DEFAULT_FLOATING_HEIGHT}
                icon={<SwapVert />}
                min={0}
                stepSize={0.1}
            />
            <ElementPropNumericInput
                name={t("floating.speed")}
                prop="floatingSpeed"
                defaultValue={DEFAULT_FLOATING_SPEED}
                icon={<Speed />}
                min={0}
                stepSize={0.1}
            />
        </PanelContainer>
    );
}
