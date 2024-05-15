import React from "react";
import { ControlGroup, InputGroup } from "@blueprintjs/core";
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
import { Button, ButtonGroup, TextField } from "@mui/material";
import { Delete, Lock, LockOpen } from "@mui/icons-material";

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
                        leftElement={<Button disabled>{t("transform.type")}</Button>}
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
                        leftElement={<Button disabled>{t("transform.type")}:</Button>}
                        rightElement={<Button disabled>{selectedElem.type}</Button>}
                        disabled
                    />
                )}
                <TextField
                    style={{ marginBottom: 5 }}
                    key={selectedElem.id + "-name"}
                    size={"small"}
                    value={selectedElem.name}
                    placeholder={t("transform.name") as string}
                    fullWidth
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
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.x") as string,
                                inputProps: {
                                    stepSize: 0.1
                                }
                            }}
                        />
                        <FlexNumericInput
                            value={selectedElem.y}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, y: val });
                            }}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.y") as string,
                                inputProps: {
                                    stepSize: 0.1
                                }
                            }}
                        />
                        <FlexNumericInput
                            value={selectedElem.z}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, z: val });
                            }}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.z") as string,
                                inputProps: {
                                    stepSize: 0.1
                                }
                            }}
                        />
                    </ControlGroup>
                    <ControlGroup fill>
                        <FlexNumericInput
                            value={selectedElem.xScale}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, xScale: val });
                            }}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.xScale") as string,
                                inputProps: {
                                    stepSize: 0.1
                                }
                            }}
                        />
                        <FlexNumericInput
                            value={selectedElem.yScale}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, yScale: val });
                            }}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.yScale") as string,
                                inputProps: {
                                    stepSize: 0.1
                                }
                            }}
                        />
                    </ControlGroup>
                    <ControlGroup fill>
                        <FlexNumericInput
                            value={selectedElem.rotation}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, rotation: val });
                            }}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.rotation") as string,
                                inputProps: {
                                    stepSize: 1
                                }
                            }}
                        />
                    </ControlGroup>
                    <ButtonGroup style={{ marginTop: 10 }} fullWidth>
                        <Button
                            variant={"text"}
                            color={"inherit"}
                            startIcon={selectedElem.properties.isLocked ? <Lock /> : <LockOpen />}
                            onClick={() => {
                                setSelectedElem({
                                    ...selectedElem,
                                    properties: {
                                        ...selectedElem.properties,
                                        isLocked: !selectedElem.properties.isLocked
                                    }
                                });
                            }}
                        >
                            {selectedElem.properties.isLocked ? t("transform.unlock") : t("transform.lock")}
                        </Button>
                        <Button
                            variant={"text"}
                            color={"inherit"}
                            startIcon={<Delete />}
                            onClick={removeSelectedElement}
                        >
                            {t("transform.delete") as string}
                        </Button>
                    </ButtonGroup>
                </>)}
            </PanelContainer>
            <MapError
                isVisible={elemVisibility !== ElemVisibility.Visible}
                info
                icon={elemVisibility == ElemVisibility.InvisibleMinimap ? "Visibility" : "VisibilityOff"}
            >
                {elemVisibility === ElemVisibility.Invisible ? t("transform.errorInvisible") : null}
                {elemVisibility === ElemVisibility.InvisibleNoSprite ? t("transform.errorNoSprite") : null}
                {elemVisibility === ElemVisibility.InvisibleMinimap ? t("transform.errorMinimap") : null}
                {elemVisibility === ElemVisibility.InvisibleFreeplay ? t("transform.errorFreeplay") : null}
            </MapError>
            <MapError
                isVisible={isConsole && (Math.abs(selectedElem.xScale) != 1 || Math.abs(selectedElem.yScale) != 1)}
                buttonText={t("transform.autoFix") as string}
                buttonIcon="Build"
                onButtonClick={fixSprite}
            >
                {t("transform.errorScale")}
            </MapError>

            <MapError
                isVisible={isCamera}
                info
                icon={"TextSnippet"}
            >
                {t("cameras.nameInfo")}
            </MapError>
        </>
    );
}
