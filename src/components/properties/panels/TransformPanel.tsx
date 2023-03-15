import React from "react";
import { Button, ButtonGroup, ControlGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import getElemVisibility, { ElemVisibility } from "../../../hooks/getMapVisibility";
import useSelectedElem, { useRemoveElement, useSetSelectedElemID } from "../../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../../hooks/jotai/useSettings";
import GUID from "../../../types/generic/GUID";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

export default function TransformPanel() {
    const { t } = useTranslation();
    const setSelectedID = useSetSelectedElemID();
    const removeElement = useRemoveElement();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const settings = useSettingsValue();

    const elemVisibility = React.useMemo(() => {
        if (!selectedElem)
            return undefined;
        return getElemVisibility(selectedElem);
    }, [selectedElem]);

    if (!selectedElem || selectedElem.type === "util-layer")
        return null;

    return (
        <>
            <PanelContainer title={t("transform.title") as string} style={{ paddingTop: 0 }}>
                {settings.isDevMode ? (
                    <InputGroup
                        key={selectedElem.id + "-type-dev"}
                        defaultValue={selectedElem.type}
                        placeholder={t("transform.type") as string}
                        leftElement={<Button minimal disabled>{t("transform.type")}</Button>}
                        onChange={(e) => {
                            setSelectedElem({ ...selectedElem, type: e.target.value });
                        }}
                    />
                ) : (
                    <InputGroup
                        style={{ backgroundColor: "var(--color-bg-2)" }}
                        key={selectedElem.id + "-type"}
                        defaultValue={t(`au.${selectedElem?.type}`) as string}
                        placeholder={t("transform.type") as string}
                        leftElement={<Button minimal disabled>{t("transform.type")}:</Button>}
                        rightElement={<Button minimal disabled>{selectedElem.type}</Button>}
                        disabled
                    />
                )}
                <InputGroup
                    style={{ marginBottom: 5 }}
                    key={selectedElem.id + "-name"}
                    value={selectedElem.name}
                    placeholder={t("transform.name") as string}
                    large
                    onChange={(e) => {
                        setSelectedElem({ ...selectedElem, name: e.target.value });
                    }}
                />
                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-x"}
                        defaultValue={selectedElem.x}
                        onValueChange={(val) => {
                            !isNaN(val) && setSelectedElem({ ...selectedElem, x: val });
                        }}
                        fill
                        placeholder={t("transform.x") as string}
                        minorStepSize={0.001}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                    <NumericInput
                        key={selectedElem.id + "-y"}
                        defaultValue={selectedElem.y}
                        onValueChange={(val) => {
                            !isNaN(val) && setSelectedElem({ ...selectedElem, y: val });
                        }}
                        fill
                        placeholder={t("transform.y") as string}
                        minorStepSize={0.001}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                    <NumericInput
                        key={selectedElem.id + "-z"}
                        defaultValue={selectedElem.z}
                        onValueChange={(val) => {
                            !isNaN(val) && setSelectedElem({ ...selectedElem, z: val });
                        }}
                        fill
                        placeholder={t("transform.z") as string}
                        minorStepSize={0.001}
                        stepSize={0.1}
                        majorStepSize={1}
                    />
                </ControlGroup>
                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-xScale"}
                        defaultValue={selectedElem.xScale}
                        onValueChange={(val) => {
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
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, isLocked: !selectedElem.properties.isLocked } });
                        }}
                    />
                    <Button
                        fill
                        icon="trash"
                        text={t("transform.delete") as string}
                        onClick={() => {
                            removeElement(selectedElem.id);
                            setSelectedID("" as GUID)
                        }}
                    />
                </ButtonGroup>
            </PanelContainer>
            <MapError
                isVisible={elemVisibility !== ElemVisibility.Visible}
                info
                icon={elemVisibility == ElemVisibility.InvisibleMinimap ? "eye-open" : "eye-off"}
            >
                {elemVisibility === ElemVisibility.Invisible ? t("transform.errorInvisible") : null}
                {elemVisibility === ElemVisibility.InvisibleNoSprite ? t("transform.errorNoSprite") : null}
                {elemVisibility === ElemVisibility.InvisibleMinimap ? t("transform.errorMinimap") : null}
                {elemVisibility === ElemVisibility.InvisibleFreeplay ? t("transform.errorFreeplay") : null}
            </MapError>
        </>
    );
}
