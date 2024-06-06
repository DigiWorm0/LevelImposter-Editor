import { useTranslation } from "react-i18next";
import {
    DEFAULT_PLATFORM_ENTER,
    DEFAULT_PLATFORM_EXIT,
    DEFAULT_PLATFORM_OFFSET
} from "../../../types/generic/Constants";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import InputGroup from "../input/InputGroup";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { Login, Logout, SwapHoriz, SwapVert } from "@mui/icons-material";

const PLATFORM_MOVE_SOUND = "platformMove";

export default function PlatformPanel() {
    const { t } = useTranslation();
    const isPlatform = useIsSelectedElemType("util-platform");

    if (!isPlatform)
        return null;

    return (
        <PanelContainer title={t("platform.title") as string}>
            <InputGroup>
                <ElementPropNumericInput
                    name={t("platform.translationX")}
                    prop="platformXOffset"
                    defaultValue={-DEFAULT_PLATFORM_OFFSET}
                    icon={<SwapHoriz />}
                    stepSize={0.5}
                    color={"warning"}
                />
                <ElementPropNumericInput
                    name={t("platform.translationY")}
                    prop="platformYOffset"
                    defaultValue={0}
                    icon={<SwapVert />}
                    stepSize={0.5}
                    color={"warning"}
                />
            </InputGroup>
            <InputGroup>
                <ElementPropNumericInput
                    name={t("platform.enterOffsetX")}
                    prop="platformXEntranceOffset"
                    defaultValue={DEFAULT_PLATFORM_ENTER}
                    icon={<Login />}
                    stepSize={0.5}
                    color={"warning"}
                />
                <ElementPropNumericInput
                    name={t("platform.enterOffsetY")}
                    prop="platformYEntranceOffset"
                    defaultValue={0}
                    icon={<Login />}
                    stepSize={0.5}
                    color={"warning"}
                />
            </InputGroup>
            <InputGroup>
                <ElementPropNumericInput
                    name={t("platform.exitOffsetX")}
                    prop="platformXExitOffset"
                    defaultValue={DEFAULT_PLATFORM_EXIT}
                    icon={<Logout />}
                    stepSize={0.5}
                    color={"warning"}
                />
                <ElementPropNumericInput
                    name={t("platform.exitOffsetY")}
                    prop="platformYExitOffset"
                    defaultValue={0}
                    icon={<Logout />}
                    stepSize={0.5}
                    color={"warning"}
                />
            </InputGroup>
            <SoundEditorPanel
                title={t("platform.moveSound") as string}
                soundType={PLATFORM_MOVE_SOUND}
                defaultSoundURL="platformMoveSound.wav"
            />
        </PanelContainer>
    );
}
