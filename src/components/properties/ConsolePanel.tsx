import { ControlGroup, FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_CONSOLE_RANGE } from "../../types/generic/Constants";
import LIColor from "../../types/li/LIColor";
import ColorPicker from "../utils/ColorPicker";
import PanelContainer from "./PanelContainer";

export default function ConsolePanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const isConsole = selectedElem?.type.startsWith("task-")
        || (selectedElem?.type.startsWith("sab-") && !selectedElem?.type.startsWith("sab-btn") && !selectedElem?.type.startsWith("sab-door"))
        || selectedElem?.type.startsWith("util-button")
        || selectedElem?.type.startsWith("util-cams")
        || selectedElem?.type === "util-admin"
        || selectedElem?.type === "util-vitals"
        || selectedElem?.type === "util-computer"
        || selectedElem?.type === "util-triggerconsole";

    if (!selectedElem || !isConsole)
        return null;

    return (
        <PanelContainer title={t("console.title") as string}>
            <FormGroup style={{
                marginBottom: 0
            }}>
                <NumericInput
                    key={selectedElem.id + "-range"}
                    fill
                    placeholder={t("console.range") as string}
                    defaultValue={selectedElem?.properties.range ? selectedElem.properties.range : DEFAULT_CONSOLE_RANGE}
                    min={0}
                    minorStepSize={0.05}
                    stepSize={0.1}
                    majorStepSize={0.5}
                    leftIcon="ring"
                    onValueChange={(val) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, range: val } });
                    }}
                />
                <ControlGroup fill style={{ textAlign: "center", marginTop: 5 }}>
                    <Switch
                        key={selectedElem.id + "-onlyfrombelow"}
                        checked={selectedElem.properties.onlyFromBelow === undefined ? false : selectedElem.properties.onlyFromBelow}
                        label={t("console.onlyFromBelow") as string}
                        onChange={(e) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, onlyFromBelow: e.currentTarget.checked } });
                        }}
                    />
                </ControlGroup>
                {!selectedElem.type.startsWith("util-") && (
                    <ControlGroup fill style={{ textAlign: "center", marginTop: 5 }}>
                        <Switch
                            key={selectedElem.id + "-checkcollision"}
                            checked={selectedElem.properties.checkCollision === undefined ? false : selectedElem.properties.checkCollision}
                            label={t("console.checkCollision") as string}
                            onChange={(e) => {
                                setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, checkCollision: e.currentTarget.checked } });
                            }}
                        />
                    </ControlGroup>
                )}
                {selectedElem.type === "util-triggerconsole" && (
                    <ColorPicker
                        fill
                        minimal
                        title={t("console.highlightColor") as string}
                        color={selectedElem?.properties.highlightColor || { r: 255, g: 255, b: 0, a: 1 }}
                        onChange={(color: LIColor) => {
                            if (!selectedElem)
                                return;
                            setSelectedElem({
                                ...selectedElem,
                                properties: {
                                    ...selectedElem.properties,
                                    highlightColor: color
                                }
                            });
                        }}
                    />
                )}
            </FormGroup>
        </PanelContainer>
    );
}
