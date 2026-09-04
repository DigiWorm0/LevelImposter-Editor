import {Download} from "@mui/icons-material";
import {Button, CircularProgress} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import {downloadSpriteAnimsAsZIP} from "@editor/spriteAnim/downloadSpriteAnimsAsZIP";

export default function SpriteAnimExportButton() {
    const {t} = useTranslation();
    const selectedElementID = useAtomValue(selectedElementIDAtom);
    const [isDownloadingPNGs, setIsDownloadingPNGs] = React.useState(false);

    const onClick = React.useCallback(() => {
        if (isDownloadingPNGs || !selectedElementID)
            return;

        setIsDownloadingPNGs(true);
        downloadSpriteAnimsAsZIP(selectedElementID)
            .finally(() => setIsDownloadingPNGs(false));
    }, [isDownloadingPNGs, selectedElementID]);

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