import React from "react";
import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import getElemVisibility, { ElemVisibility } from "../../../utils/getMapVisibility";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../../hooks/useSettings";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import getIsConsole from "../../../utils/getIsConsole";
import useFixSprite from "../../../hooks/canvas/useFixSprite";
import FlexNumericInput from "../util/FlexNumericInput";
import { useRemoveSelectedElement } from "../../../hooks/map/elements/useRemoveElement";

export default function TransformPanel() {
    const { t } = useTranslation();
    const removeSelectedElement = useRemoveSelectedElement();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { isDevMode } = useSettingsValue();
    const fixSprite = useFixSprite();

    // Gets if the selected element is a console object
    const isConsole = React.useMemo(() => {
        return getIsConsole(selectedElem?.type || "");
    }, [selectedElem]);

    // Gets if the selected element is a camera object
    const isCamera = React.useMemo(() => {
        return selectedElem?.type === "util-cam";
    }, [selectedElem]);

    // Gets the visibility of the selected element
    const elemVisibility = React.useMemo(() => {
        return getElemVisibility(selectedElem);
    }, [selectedElem]);

    if (!selectedElem)
        return null;

    return (
        <>
            <PanelContainer
                title={t("transform.title") as string}
                style={{ paddingTop: 0 }}
            >
                {isDevMode ? (
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
                {selectedElem.type !== "util-layer" && (<>
                    <ControlGroup fill>
                        <FlexNumericInput
                            value={selectedElem.x}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, x: val });
                            }}
                            fill
                            placeholder={t("transform.x") as string}
                            minorStepSize={0.001}
                            stepSize={0.1}
                            majorStepSize={1}
                        />
                        <FlexNumericInput
                            value={selectedElem.y}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, y: val });
                            }}
                            fill
                            placeholder={t("transform.y") as string}
                            minorStepSize={0.001}
                            stepSize={0.1}
                            majorStepSize={1}
                        />
                        <FlexNumericInput
                            value={selectedElem.z}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, z: val });
                            }}
                            fill
                            placeholder={t("transform.z") as string}
                            minorStepSize={0.001}
                            stepSize={0.1}
                            majorStepSize={1}
                        />
                    </ControlGroup>
                    <ControlGroup fill>
                        <FlexNumericInput
                            value={selectedElem.xScale}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, xScale: val });
                            }}
                            fill
                            leftIcon="arrows-horizontal"
                            placeholder={t("transform.xScale") as string}
                            minorStepSize={0.001}
                            stepSize={0.1}
                            majorStepSize={1}
                        />
                        <FlexNumericInput
                            value={selectedElem.yScale}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, yScale: val });
                            }}
                            fill
                            leftIcon="arrows-vertical"
                            placeholder={t("transform.yScale") as string}
                            minorStepSize={0.001}
                            stepSize={0.1}
                            majorStepSize={1}
                        />
                    </ControlGroup>
                    <ControlGroup fill>
                        <FlexNumericInput
                            value={selectedElem.rotation}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, rotation: val });
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
                                setSelectedElem({
                                    ...selectedElem,
                                    properties: {
                                        ...selectedElem.properties,
                                        isLocked: !selectedElem.properties.isLocked
                                    }
                                });
                            }}
                        />
                        <Button
                            fill
                            icon="trash"
                            text={t("transform.delete") as string}
                            onClick={removeSelectedElement}
                        />
                    </ButtonGroup>
                </>)}
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
            <MapError
                isVisible={isConsole && (Math.abs(selectedElem.xScale) != 1 || Math.abs(selectedElem.yScale) != 1)}
                buttonText={t("transform.autoFix") as string}
                buttonIcon="wrench"
                onButtonClick={fixSprite}
            >
                {t("transform.errorScale")}
            </MapError>

            <MapError
                isVisible={isCamera}
                info
                icon={"paragraph"}
            >
                {t("cameras.nameInfo")}
            </MapError>
        </>
    );
}
