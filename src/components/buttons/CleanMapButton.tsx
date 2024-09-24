import {CleaningServices} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import useCleanMap, {CleanMapOptions} from "../../hooks/canvas/useCleanMap";
import useToaster from "../../hooks/useToaster";
import CleanMapModal from "../modals/CleanMap/CleanMapModal";
import ProcessModal from "../modals/ProcessModal";

export interface CleanMapButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>;
}

export default function CleanMapButton(props: CleanMapButtonProps) {
    const {t} = useTranslation();
    const toaster = useToaster();
    const cleanMap = useCleanMap();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCleaning, setIsCleaning] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const onCleanMap = React.useCallback((options: CleanMapOptions) => {
        setIsModalOpen(false);
        setIsCleaning(true);
        setProgress(0);
        cleanMap({
            ...options,
            onProgress: setProgress
        })
            .then(() => toaster.success(t("map.cleanSuccess")))
            .catch(toaster.error)
            .finally(() => setIsCleaning(false));
    }, [cleanMap, toaster]);

    return (
        <>
            <Tooltip title={t("map.clean")}>
                <span>
                    <IconButton
                        onClick={() => setIsModalOpen(true)}
                        disabled={isCleaning}
                        {...props.buttonProps}
                    >
                        <CleaningServices/>
                    </IconButton>
                </span>
            </Tooltip>

            <CleanMapModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onClean={onCleanMap}
            />
            
            <ProcessModal
                title={t("map.cleaning")}
                description={t("map.cleanDesc")}
                isRunning={isCleaning}
                progress={progress}
            />
        </>
    );
}