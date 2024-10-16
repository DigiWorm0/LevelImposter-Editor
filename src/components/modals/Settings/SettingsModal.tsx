import React from "react";
import {useTranslation} from "react-i18next";
import SettingsSwitchInput from "../../properties/input/settings/SettingsSwitchInput";
import SettingsNumericInput from "../../properties/input/settings/SettingsNumericInput";
import SettingsLocalizationInput from "../../properties/input/select/SettingsLocalizationInput";
import GenericModal from "../GenericModal";
import SettingsPercentInput from "../../properties/input/settings/SettingsPercentInput";
import {
    AdsClick,
    Animation,
    Article,
    AspectRatio,
    Code,
    Edit,
    Grid3x3,
    GridGoldenratio,
    GridOn,
    Info,
    Layers,
    LinearScale,
    LineWeight,
    PlayCircle,
    ShapeLine,
    SwapVert,
    Visibility,
    VolumeUp
} from "@mui/icons-material";
import SettingsHeader from "./SettingsHeader";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    const {t} = useTranslation();

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={t("settings.interface.title") as string}
        >
            <SettingsLocalizationInput/>
            <SettingsHeader>
                {t("settings.colliders")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.colliderPreview")}
                prop="colliderPreview"
                icon={<ShapeLine/>}
            />
            <SettingsNumericInput
                name={t("settings.interface.colliderHandleSize")}
                prop="colliderHandleSize"
                icon={<AdsClick/>}
                min={1}
                stepSize={1}
                label={"px"}
            />
            <SettingsHeader>
                {t("settings.scenegraph")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.scrollToSelection")}
                prop="scrollToSelection"
                icon={<SwapVert/>}
            />
            <SettingsHeader>
                {t("settings.canvas")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.showRoomName")}
                prop="isRoomNameVisible"
                icon={<Article/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.animateGIF")}
                prop="animateGIFOnSelect"
                icon={<PlayCircle/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.showInfo")}
                prop="isInfoVisible"
                icon={<Info/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.showConnections")}
                prop="connectionsPreview"
                icon={<ShapeLine/>}
            />
            <SettingsPercentInput
                name={t("settings.interface.invisibleOpacity")}
                prop="invisibleOpacity"
                icon={<Visibility/>}
            />

            <SettingsHeader>
                {t("settings.grid")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.grid")}
                prop="isGridVisible"
                icon={<GridOn/>}
            />
            <SettingsNumericInput
                name={t("settings.interface.gridSize")}
                prop="gridSize"
                icon={<AspectRatio/>}
                min={1}
                stepSize={1}
                label={"px"}
            />
            <SettingsNumericInput
                name={t("settings.interface.gridSpacing")}
                prop="gridSpacing"
                icon={<LineWeight/>}
                min={1}
                stepSize={1}
                label={"px"}
            />
            <SettingsSwitchInput
                name={t("settings.interface.snapToGrid")}
                prop="isGridSnapEnabled"
                icon={<Grid3x3/>}
            />
            <SettingsNumericInput
                name={t("settings.interface.snapResolution")}
                prop="gridSnapResolution"
                icon={<GridGoldenratio/>}
                min={0}
                stepSize={0.1}
                label={"px"}
            />

            <SettingsHeader>
                {t("settings.animation")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.animPreview")}
                prop="animPreview"
                icon={<PlayCircle/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.snapToTimeline")}
                prop="isTimelineSnapEnabled"
                icon={<LinearScale/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.audioDownmix")}
                prop="isAudioDownmixEnabled"
                icon={<VolumeUp/>}
            />

            <SettingsHeader>
                {t("settings.experimental")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.animAnything")}
                prop="animAnything"
                icon={<Animation/>}
                experimental
            />
            <SettingsSwitchInput
                name={t("settings.interface.objNesting")}
                prop="elementNesting"
                icon={<Layers/>}
                experimental
            />
            <SettingsSwitchInput
                name={t("settings.interface.editType")}
                prop="editType"
                icon={<Edit/>}
                experimental
            />
            <SettingsSwitchInput
                name={t("settings.interface.devMode")}
                prop="isDevMode"
                icon={<Code/>}
                experimental
            />
        </GenericModal>
    );
}