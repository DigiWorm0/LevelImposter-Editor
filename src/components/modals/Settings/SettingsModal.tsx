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
    Code,
    Edit,
    FolderOff,
    Gradient,
    Grid3x3,
    GridGoldenratio,
    GridOn,
    HorizontalRule,
    ImportExport,
    Info,
    Layers,
    LinearScale,
    PlayArrow,
    PlayCircle,
    ShapeLine,
    SwapVert,
    Visibility,
    VolumeUp
} from "@mui/icons-material";
import SettingsHeader from "./SettingsHeader";
import {Box} from "@mui/material";
import {useSettingsValue} from "@/hooks/useSettings";
import MapError from "../../properties/util/MapError";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    const {t} = useTranslation();
    const settings = useSettingsValue();

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
            <SettingsPercentInput
                name={t("settings.interface.invisibleOpacity")}
                prop="invisibleOpacity"
                icon={<Visibility/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.showConnectionArrows")}
                prop="showConnectionArrows"
                icon={<ImportExport/>}
            />
            <Box sx={{marginLeft: 2}}>
                <SettingsNumericInput
                    disabled={!settings.showConnectionArrows}
                    name={t("settings.interface.connectionArrowHeadSize")}
                    prop="connectionArrowHeadSize"
                    icon={<PlayArrow/>}
                    min={1}
                    stepSize={1}
                    label={"px"}
                />
                <SettingsNumericInput
                    disabled={!settings.showConnectionArrows}
                    name={t("settings.interface.connectionArrowWidth")}
                    prop="connectionArrowWidth"
                    icon={<HorizontalRule/>}
                    min={1}
                    stepSize={1}
                    label={"px"}
                />
            </Box>
            <SettingsSwitchInput
                name={t("settings.interface.audioDownmix")}
                prop="isAudioDownmixEnabled"
                icon={<VolumeUp/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.autoConvertGIFToAnimation")}
                prop="autoConvertGIFToAnimation"
                icon={<Animation/>}
            />
            <Box sx={{marginLeft: 2}}>
                <MapError isVisible={!settings.autoConvertGIFToAnimation}>
                    {t("settings.interface.errorAutoConvertGIFToAnimation")}
                </MapError>
            </Box>

            <SettingsSwitchInput
                name={t("settings.interface.autoEncodeToDDS")}
                prop="autoEncodeToDDS"
                icon={<Gradient/>}
            />
            <Box sx={{marginLeft: 2}}>
                <MapError isVisible={!settings.autoEncodeToDDS}>
                    {t("settings.interface.errorAutoEncodeToDDS")}
                </MapError>
            </Box>

            <SettingsSwitchInput
                name={t("settings.interface.hideGroups")}
                prop="hideGroups"
                icon={<FolderOff/>}
            />

            <SettingsHeader>
                {t("settings.grid")}
            </SettingsHeader>
            <SettingsSwitchInput
                name={t("settings.interface.grid")}
                prop="isGridVisible"
                icon={<GridOn/>}
            />
            <SettingsSwitchInput
                name={t("settings.interface.snapToGrid")}
                prop="isGridSnapEnabled"
                icon={<Grid3x3/>}
            />
            <Box sx={{marginLeft: 2}}>
                <SettingsNumericInput
                    disabled={!settings.isGridSnapEnabled}
                    name={t("settings.interface.snapResolution")}
                    prop="gridSnapResolution"
                    icon={<GridGoldenratio/>}
                    min={0}
                    stepSize={0.1}
                    label={"px"}
                />
            </Box>

            <SettingsHeader>
                {t("settings.spriteAnim")}
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

            <SettingsHeader>
                {t("settings.experimental")}
            </SettingsHeader>
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