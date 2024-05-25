import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import InputGroup from "../input/InputGroup";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function CamPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || (element.type !== "util-cam" && element.type !== "util-cams4" && element.type !== "util-display"))
        return null;

    return (
        <PanelContainer title={t("cameras.title") as string}>
            <InputGroup>
                <NumericPanelInput
                    name="cameras.offsetx"
                    prop="camXOffset"
                    defaultValue={0}
                    icon="SwapHoriz"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    color={"success"}
                />
                <NumericPanelInput
                    name="cameras.offsety"
                    prop="camYOffset"
                    defaultValue={0}
                    icon="SwapVert"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    color={"success"}
                />
            </InputGroup>
            <NumericPanelInput
                name="cameras.zoom"
                prop="camZoom"
                defaultValue={3}
                icon="ZoomIn"
                min={0}
                minorStepSize={0.1}
                stepSize={0.5}
                majorStepSize={1}
                color={"success"}
            />
        </PanelContainer>
    );
}
