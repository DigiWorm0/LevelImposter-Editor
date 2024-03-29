import { ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { DEFAULT_PLATFORM_ENTER, DEFAULT_PLATFORM_EXIT, DEFAULT_PLATFORM_OFFSET } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";
import SoundEditorPanel from "../editors/SoundEditorPanel";

const PLATFORM_MOVE_SOUND = "platformMove";

export default function PlatformPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || element.type !== "util-platform")
        return null;

    return (
        <PanelContainer title={t("platform.title") as string}>
            <ControlGroup fill>
                <NumericPanelInput
                    name="platform.translationX"
                    prop="platformXOffset"
                    defaultValue={-DEFAULT_PLATFORM_OFFSET}
                    icon="arrows-horizontal"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"warning"}
                />
                <NumericPanelInput
                    name="platform.translationY"
                    prop="platformYOffset"
                    defaultValue={0}
                    icon="arrows-vertical"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"warning"}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericPanelInput
                    name="platform.enterOffsetX"
                    prop="platformXEntranceOffset"
                    defaultValue={DEFAULT_PLATFORM_ENTER}
                    icon="log-in"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"warning"}
                />
                <NumericPanelInput
                    name="platform.enterOffsetY"
                    prop="platformYEntranceOffset"
                    defaultValue={0}
                    icon="log-in"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"warning"}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericPanelInput
                    name="platform.exitOffsetX"
                    prop="platformXExitOffset"
                    defaultValue={DEFAULT_PLATFORM_EXIT}
                    icon="log-out"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"warning"}
                />
                <NumericPanelInput
                    name="platform.exitOffsetY"
                    prop="platformYExitOffset"
                    defaultValue={0}
                    icon="log-out"
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    intent={"warning"}
                />
            </ControlGroup>
            <SoundEditorPanel
                title={t("platform.moveSound") as string}
                soundType={PLATFORM_MOVE_SOUND}
                defaultSoundURL="platformMoveSound.wav"
            />
        </PanelContainer>
    );
}
