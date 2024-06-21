import {
    Build,
    Delete,
    Lock,
    LockOpen,
    RotateLeft,
    SwapHoriz,
    SwapVert,
    TextSnippet,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import { Button, ButtonGroup, InputAdornment, TextField, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRemoveSelectedElement } from "../../../hooks/elements/useRemoveElement";
import { useSettingsValue } from "../../../hooks/useSettings";
import AUElementDB from "../../../types/db/AUElementDB";
import { ElemVisibility } from "../../../utils/map/getMapVisibility";
import InputGroup from "../input/InputGroup";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import useSelectedElemTransform from "../../../hooks/elements/useSelectedElemTransform";
import { useSelectedElemIDValue } from "../../../hooks/elements/useSelectedElem";
import useElementVisibility from "../../../hooks/elements/useElementVisibility";
import TransformNumericInput from "../input/TransformNumericInput";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import useFixSpriteScaling from "../../../hooks/canvas/useFixSpriteScaling";
import getIsConsole from "../../../utils/map/getIsConsole";

export default function TransformPanel() {
    const { t } = useTranslation();
    const [type, setType] = useSelectedElemTransform<string>("type");
    const [name, setName] = useSelectedElemTransform<string>("name");
    const [xScale] = useSelectedElemTransform<number>("xScale");
    const [yScale] = useSelectedElemTransform<number>("yScale");
    const [_isLocked, setLocked] = useSelectedElemProp("isLocked");
    const [_isVisible, setVisible] = useSelectedElemProp("isVisible");
    const selectedElemID = useSelectedElemIDValue();
    const elemVisibility = useElementVisibility(selectedElemID);

    const isLocked = _isLocked ?? false;
    const isVisible = _isVisible ?? true;
    const removeSelectedElement = useRemoveSelectedElement();
    const { isDevMode } = useSettingsValue();
    const fixSprite = useFixSpriteScaling();

    // Gets if the selected element is a console object
    const isConsole = getIsConsole(type || "");

    // Gets if the selected element is a camera object
    const isCamera = type === "util-cam";

    if (!selectedElemID)
        return null;
    return (
        <>
            <PanelContainer
                title={t("transform.title") as string}
                style={{ paddingTop: 0 }}
            >
                <TextField
                    key={selectedElemID + "-type"}
                    disabled={!isDevMode}
                    size={"small"}
                    variant={"standard"}
                    defaultValue={type}
                    placeholder={t("transform.type") as string}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                {AUElementDB.includes(type || "") ? t(`au.${type}`) : "?"}
                            </InputAdornment>
                        )
                    }}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    sx={{ marginBottom: 1 }}
                />
                <TextField
                    style={{ marginBottom: 5 }}
                    key={selectedElemID + "-name"}
                    size={"small"}
                    value={name}
                    placeholder={t("transform.name") as string}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
                {type !== "util-layer" && (<>
                    <InputGroup>
                        <TransformNumericInput name={t("transform.x")} prop={"x"} />
                        <TransformNumericInput name={t("transform.y")} prop={"y"} />
                        <TransformNumericInput name={t("transform.z")} prop={"z"} />
                    </InputGroup>
                    <InputGroup>
                        <TransformNumericInput name={t("transform.xScale")} prop={"xScale"} icon={<SwapHoriz />} />
                        <TransformNumericInput name={t("transform.yScale")} prop={"yScale"} icon={<SwapVert />} />
                    </InputGroup>
                    <TransformNumericInput
                        name={t("transform.rotation")}
                        prop={"rotation"}
                        icon={<RotateLeft />}
                        stepSize={5}
                    />
                    <ButtonGroup style={{ marginTop: 10 }} fullWidth>
                        <Tooltip title={isVisible ? t("transform.hide") : t("transform.show")}>
                            <Button
                                variant={"text"}
                                color={"inherit"}
                                onClick={() => setVisible(!isVisible)}
                            >
                                {isVisible ? <Visibility /> : <VisibilityOff />}
                            </Button>
                        </Tooltip>
                        <Tooltip title={isLocked ? t("transform.unlock") : t("transform.lock")}>
                            <Button
                                variant={"text"}
                                color={"inherit"}
                                onClick={() => setLocked(!isLocked)}
                            >
                                {isLocked ? <Lock /> : <LockOpen />}
                            </Button>
                        </Tooltip>
                        <Tooltip title={t("transform.delete")}>
                            <Button
                                variant={"text"}
                                color={"inherit"}
                                onClick={removeSelectedElement}
                            >
                                <Delete />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </>)}
            </PanelContainer>
            <MapError
                isVisible={elemVisibility !== ElemVisibility.Visible}
                info
                icon={elemVisibility == ElemVisibility.InvisibleMinimap ? <Visibility /> : <VisibilityOff />}
            >
                {elemVisibility === ElemVisibility.Invisible ? t("transform.errorInvisible") : null}
                {elemVisibility === ElemVisibility.InvisibleNoSprite ? t("transform.errorNoSprite") : null}
                {elemVisibility === ElemVisibility.InvisibleMinimap ? t("transform.errorMinimap") : null}
                {elemVisibility === ElemVisibility.InvisibleFreeplay ? t("transform.errorFreeplay") : null}
            </MapError>
            <MapError
                isVisible={isConsole && (Math.abs(xScale || 1) != 1 || Math.abs(yScale || 1) != 1)}
                buttonText={t("transform.autoFix") as string}
                buttonIcon={<Build />}
                onButtonClick={fixSprite}
            >
                {t("transform.errorScale")}
            </MapError>

            <MapError
                isVisible={isCamera}
                info
                icon={<TextSnippet />}
            >
                {t("cameras.nameInfo")}
            </MapError>
        </>
    );
}
