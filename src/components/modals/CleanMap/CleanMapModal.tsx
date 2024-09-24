import {Box, Button, Collapse, DialogContentText, Divider, List} from "@mui/material";
import GenericModal from "../GenericModal";
import {useTranslation} from "react-i18next";
import React from "react";
import CleanMapOption from "./CleanMapOption";
import {ArrowDownward, AspectRatio, CallMerge, ContentCut, Crop, PlayArrow} from "@mui/icons-material";
import {CleanMapOptions} from "../../../hooks/canvas/useCleanMap";

export interface CleanMapModalProps {
    isVisible: boolean;
    onClose: () => void;
    onClean: (options: CleanMapOptions) => void;
}

export default function CleanMapModal(props: CleanMapModalProps) {
    const {t} = useTranslation();
    const [autoScale, setAutoScale] = React.useState(false);
    const [scaleDownOnly, setScaleDownOnly] = React.useState(true);
    const [autoCrop, setAutoCrop] = React.useState(false);
    const [autoMerge, setAutoMerge] = React.useState(false);
    const [autoTrim, setAutoTrim] = React.useState(false);

    const onClean = React.useCallback(() => {
        props.onClean({
            autoScale,
            scaleDownOnly,
            autoCrop,
            mergeAssets: autoMerge,
            trimAssets: autoTrim
        });
    }, [autoScale, scaleDownOnly, autoCrop, autoMerge, autoTrim, props]);

    return (
        <GenericModal
            open={props.isVisible}
            onClose={props.onClose}
            title={t("map.clean")}
            DialogProps={{
                maxWidth: "xs"
            }}
        >
            <Box>
                <DialogContentText
                    fontSize={"small"}
                >
                    {t("map.cleanDesc")}
                </DialogContentText>
                <Divider sx={{mt: 1}}/>
                <List dense>
                    <CleanMapOption
                        value={autoScale}
                        setValue={setAutoScale}
                        label={t("map.autoScale")}
                        icon={<AspectRatio/>}
                    />
                    <Collapse in={autoScale} sx={{marginLeft: 2}}>
                        <CleanMapOption
                            value={scaleDownOnly}
                            setValue={setScaleDownOnly}
                            label={t("map.scaleDownOnly")}
                            icon={<ArrowDownward/>}
                        />
                    </Collapse>
                    <CleanMapOption
                        value={autoCrop}
                        setValue={setAutoCrop}
                        label={t("map.autoCrop")}
                        icon={<Crop/>}
                    />
                    <CleanMapOption
                        value={autoMerge}
                        setValue={setAutoMerge}
                        label={t("map.autoMerge")}
                        icon={<CallMerge/>}
                    />
                    <CleanMapOption
                        value={autoTrim}
                        setValue={setAutoTrim}
                        label={t("map.autoTrim")}
                        icon={<ContentCut/>}
                    />
                </List>

                <Divider sx={{mb: 1}}/>
                <Button
                    variant={"contained"}
                    size={"small"}
                    onClick={onClean}
                    fullWidth
                >
                    <PlayArrow
                        sx={{mr: 1}}
                    />
                    {t("map.clean")}
                </Button>
            </Box>
        </GenericModal>
    );
}