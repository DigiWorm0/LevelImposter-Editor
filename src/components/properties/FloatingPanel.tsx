import { FormGroup, NumericInput } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function FloatingPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || selectedElem.type !== "util-blankfloat")
        return null;

    return (
        <PanelContainer title={t("floating.title") as string}>
            <FormGroup>
                <NumericInput
                    key={selectedElem.id + "-height"}
                    fill
                    placeholder={t("floating.height") as string}
                    defaultValue={selectedElem?.properties.floatingHeight !== undefined ? selectedElem.properties.floatingHeight : DEFAULT_FLOATING_HEIGHT}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                    leftIcon="arrows-vertical"
                    onValueChange={(val) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, floatingHeight: val } });
                    }}
                />
                <NumericInput
                    key={selectedElem.id + "-speed"}
                    fill
                    placeholder={t("floating.speed") as string}
                    defaultValue={selectedElem?.properties.floatingSpeed !== undefined ? selectedElem.properties.floatingSpeed : DEFAULT_FLOATING_SPEED}
                    min={0}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                    leftIcon="double-chevron-up"
                    onValueChange={(val) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, floatingSpeed: val } });
                    }}
                />

            </FormGroup>
        </PanelContainer>
    );
}
