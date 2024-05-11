import { ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function CamPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || (element.type !== "util-cam" && element.type !== "util-cams4" && element.type !== "util-display"))
        return null;

    return (
        <PanelContainer title={t("cameras.title") as string}>
            <ControlGroup fill>
                <NumericPanelInput
                    name="cameras.offsetx"
                    prop="camXOffset"
                    defaultValue={0}
                    icon="arrows-horizontal"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"success"}
                />
                <NumericPanelInput
                    name="cameras.offsety"
                    prop="camYOffset"
                    defaultValue={0}
                    icon="arrows-vertical"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"success"}
                />
            </ControlGroup>
            <NumericPanelInput
                name="cameras.zoom"
                prop="camZoom"
                defaultValue={3}
                icon="zoom-in"
                min={0}
                minorStepSize={0.1}
                stepSize={0.5}
                majorStepSize={1}
                intent={"success"}
            />
        </PanelContainer>
    );
}
