import { Delete, Lock, LockOpen, RotateLeft, SwapHoriz, SwapVert } from "@mui/icons-material";
import { Button, ButtonGroup, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import useFixSpriteScaling from "../../../hooks/canvas/useFixSpriteScaling";
import { useRemoveSelectedElement } from "../../../hooks/elements/useRemoveElement";
import useSelectedElem from "../../../hooks/elements/useSelectedElem";
import { useSettingsValue } from "../../../hooks/useSettings";
import AUElementDB from "../../../types/db/AUElementDB";
import getIsConsole from "../../../utils/getIsConsole";
import getElemVisibility, { ElemVisibility } from "../../../utils/getMapVisibility";
import InputGroup from "../input/InputGroup";
import FlexNumericInput from "../util/FlexNumericInput";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

export default function TransformPanel() {
    const { t } = useTranslation();
    const removeSelectedElement = useRemoveSelectedElement();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { isDevMode } = useSettingsValue();
    const fixSprite = useFixSpriteScaling();

    // Gets if the selected element is a console object
    const isConsole = getIsConsole(selectedElem?.type || "");

    // Gets if the selected element is a camera object
    const isCamera = selectedElem?.type === "util-cam";

    // Gets the visibility of the selected element
    const elemVisibility = getElemVisibility(selectedElem);

    if (!selectedElem)
        return null;

    return (
        <>
            <PanelContainer
                title={t("transform.title") as string}
                style={{ paddingTop: 0 }}
            >
                <TextField
                    key={selectedElem.id + "-type"}
                    disabled={!isDevMode}
                    size={"small"}
                    variant={"standard"}
                    defaultValue={selectedElem.type}
                    placeholder={t("transform.type") as string}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {t("transform.type")}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                {AUElementDB.includes(selectedElem.type) ? t(`au.${selectedElem.type}`) : "?"}
                            </InputAdornment>
                        )
                    }}
                    onChange={(e) => {
                        setSelectedElem({ ...selectedElem, type: e.target.value });
                    }}
                    sx={{ marginBottom: 1 }}
                />
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
                    <InputGroup>
                        <FlexNumericInput
                            value={selectedElem.x}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, x: val });
                            }}
                            stepSize={0.1}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.x") as string,
                            }}
                        />
                        <FlexNumericInput
                            value={selectedElem.y}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, y: val });
                            }}
                            stepSize={0.1}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.y") as string,
                            }}
                        />
                        <FlexNumericInput
                            value={selectedElem.z}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, z: val });
                            }}
                            stepSize={0.1}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.z") as string,
                            }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FlexNumericInput
                            value={selectedElem.xScale}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, xScale: val });
                            }}
                            stepSize={0.25}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.xScale") as string,
                                InputProps: {
                                    endAdornment: (<InputAdornment position={"end"}><SwapHoriz /></InputAdornment>)
                                },
                            }}
                        />
                        <FlexNumericInput
                            value={selectedElem.yScale}
                            onChange={(val) => {
                                setSelectedElem({ ...selectedElem, yScale: val });
                            }}
                            stepSize={0.25}
                            inputProps={{
                                size: "small",
                                fullWidth: true,
                                placeholder: t("transform.yScale") as string,
                                InputProps: {
                                    endAdornment: (<InputAdornment position={"end"}><SwapVert /></InputAdornment>)
                                }
                            }}
                        />
                    </InputGroup>
                    <FlexNumericInput
                        value={selectedElem.rotation}
                        onChange={(val) => {
                            setSelectedElem({ ...selectedElem, rotation: val });
                        }}
                        stepSize={45}
                        inputProps={{
                            size: "small",
                            fullWidth: true,
                            placeholder: t("transform.rotation") as string,
                            InputProps: {
                                endAdornment: (<InputAdornment position={"end"}><RotateLeft /></InputAdornment>)
                            },
                        }}
                    />
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
