import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import OptimizeMapModal from "../modals/OptimizeMap/OptimizeMapModal";
import {CleaningServices} from "@mui/icons-material";

export interface CleanMapButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>;
}

export default function OptimizeMapButton(props: CleanMapButtonProps) {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <Tooltip title={t("map.optimize")}>
                <IconButton
                    onClick={() => setIsModalOpen(true)}
                    {...props.buttonProps}
                >
                    <CleaningServices/>
                </IconButton>
            </Tooltip>

            <OptimizeMapModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}