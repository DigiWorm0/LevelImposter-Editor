import {Download} from "@mui/icons-material";
import {Button, CircularProgress} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import useDownloadSpriteAnimsAsPNG from "../../hooks/spriteAnim/useDownloadSpriteAnimsAsPNG";
import {useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";

export default function SpriteAnimExportButton() {
    const {t} = useTranslation();
    const selectedElementID = useAtomValue(selectedElementIDAtom);
    const downloadPNGs = useDownloadSpriteAnimsAsPNG();
    const [isDownloadingPNGs, setIsDownloadingPNGs] = React.useState(false);

    const onClick = React.useCallback(() => {
        if (isDownloadingPNGs)
            return;

        setIsDownloadingPNGs(true);
        downloadPNGs({elementID: selectedElementID}).finally(() => setIsDownloadingPNGs(false));
    }, [isDownloadingPNGs, downloadPNGs, selectedElementID]);

    return (
        <Button
            variant={"outlined"}
            color={"secondary"}
            size={"small"}
            fullWidth
            disabled={isDownloadingPNGs}
            onClick={onClick}
        >
            {isDownloadingPNGs && (
                <CircularProgress
                    sx={{marginRight: 0.5}}
                    size={16}
                    color={"inherit"}
                />
            )}
            {!isDownloadingPNGs && (
                <Download
                    sx={{marginRight: 0.5}}
                    fontSize={"small"}
                />
            )}
            {t("sprite.exportSpriteAnimation")}
        </Button>
    );
}