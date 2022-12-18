import { Button, ButtonGroup, ControlGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import getMapVisibility, { MapVisibility } from "../../hooks/getMapVisibility";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem, { useRemoveElement, useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import GUID from "../../types/generic/GUID";
import DevInfo from "../DevInfo";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";

export default function TransformPanel() {
    const { t } = useTranslation();
    const setSelectedID = useSetSelectedElemID();
    const removeElement = useRemoveElement();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const settings = useSettingsValue();
    const saveHistory = useSaveHistory();

    const elemVisibility = selectedElem && getMapVisibility(selectedElem);

    if (!selectedElem || selectedElem.type === "util-layer")
        return null;

    return (
        <>
            <PanelContainer title={t("transform.title") as string}>
                <DevInfo>
                    {selectedElem.id}
                </DevInfo>

                <InputGroup
                    style={{ marginBottom: 5 }}
                    key={selectedElem.id + "-name"}
                    value={selectedElem.name}
                    placeholder={t("transform.name") as string}
                    large
                    onChange={(e) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, name: e.target.value });
                    }}
                />
                {settings.isDevMode && (
                    <InputGroup
                        style={{ marginBottom: 5 }}
                        key={selectedElem.id + "-type"}
                        defaultValue={selectedElem.type}
                        placeholder={t("transform.type") as string}
                        large
                        onChange={(e) => {
                            saveHistory();
                            setSelectedElem({ ...selectedElem, type: e.target.value });
                        }}
                    />
                )}
                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-x"}
                        defaultValue={selectedElem.x}
                        onValueChange={(val) => {
                            saveHistory();
                            !isNaN(val) && setSelectedElem({ ...selectedElem, x: val });
                        }}
                        fill
                        placeholder={t("transform.x") as string}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                    <NumericInput
                        key={selectedElem.id + "-y"}
                        defaultValue={selectedElem.y}
                        onValueChange={(val) => {
                            saveHistory();
                            !isNaN(val) && setSelectedElem({ ...selectedElem, y: val });
                        }}
                        fill
                        placeholder={t("transform.y") as string}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                    <NumericInput
                        key={selectedElem.id + "-z"}
                        defaultValue={selectedElem.z}
                        onValueChange={(val) => {
                            saveHistory();
                            !isNaN(val) && setSelectedElem({ ...selectedElem, z: val });
                        }}
                        fill
                        placeholder={t("transform.z") as string}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                </ControlGroup>
                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-xScale"}
                        defaultValue={selectedElem.xScale}
                        onValueChange={(val) => {
                            saveHistory();
                            !isNaN(val) && setSelectedElem({ ...selectedElem, xScale: val });
                        }}
                        fill
                        leftIcon="arrows-horizontal"
                        placeholder={t("transform.xScale") as string}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                    <NumericInput
                        key={selectedElem.id + "-yScale"}
                        defaultValue={selectedElem.yScale}
                        onValueChange={(val) => {
                            saveHistory();
                            !isNaN(val) && setSelectedElem({ ...selectedElem, yScale: val });
                        }}
                        fill
                        leftIcon="arrows-vertical"
                        placeholder={t("transform.yScale") as string}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                </ControlGroup>
                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-rotation"}
                        defaultValue={selectedElem.rotation}
                        onValueChange={(val) => {
                            saveHistory();
                            !isNaN(val) && setSelectedElem({ ...selectedElem, rotation: val });
                        }}
                        fill
                        leftIcon="refresh"
                        placeholder={t("transform.rotation") as string}
                        minorStepSize={1}
                        stepSize={45}
                        majorStepSize={90}
                    />
                </ControlGroup>
                <ButtonGroup minimal style={{ marginTop: 10 }} fill>
                    <Button
                        fill
                        icon={selectedElem.properties.isLocked ? "lock" : "unlock"}
                        text={selectedElem.properties.isLocked ? t("transform.unlock") : t("transform.lock")}
                        onClick={() => {
                            saveHistory();
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, isLocked: !selectedElem.properties.isLocked } });
                        }}
                    />
                    <Button
                        fill
                        icon="trash"
                        text={t("transform.delete") as string}
                        onClick={() => {
                            saveHistory();
                            removeElement(selectedElem.id);
                            setSelectedID("" as GUID)
                        }}
                    />
                </ButtonGroup>
            </PanelContainer>
            <MapError
                isVisible={elemVisibility !== MapVisibility.Visible}
                info
                icon={elemVisibility == MapVisibility.InvisibleMinimap ? "eye-open" : "eye-off"}>
                {elemVisibility === MapVisibility.Invisible ? t("transform.errorInvisible") : null}
                {elemVisibility === MapVisibility.InvisibleNoSprite ? t("transform.errorNoSprite") : null}
                {elemVisibility === MapVisibility.InvisibleMinimap ? t("transform.errorMinimap") : null}
                {elemVisibility === MapVisibility.InvisibleFreeplay ? t("transform.errorFreeplay") : null}
            </MapError>
        </>
    );
}
