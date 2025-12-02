import GenericModal from "../GenericModal";
import React from "react";
import {useTranslation} from "react-i18next";
import useSpriteAnimEditorOpen from "../../../hooks/spriteAnim/useSpriteAnimEditorOpen";
import {Alert, AlertTitle, Box} from "@mui/material";
import AnimatedSpriteFrameList from "./frames/AnimatedSpriteFrameList";
import AnimatedSpritePreview from "./preview/AnimatedSpritePreview";
import SpriteAnimEditorNoAnimationError from "./SpriteAnimEditorNoAnimationError";
import {Animation} from "@mui/icons-material";
import ErrorBoundary from "../../utils/ErrorBoundary";
import AnimatedSpriteTypeList from "./animationList/AnimatedSpriteTypeList";

export default function SpriteAnimEditorModal() {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useSpriteAnimEditorOpen();

    return (
        <GenericModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            icon={<Animation/>}
            title={t("sprite.animationEditor")}
            DialogProps={{
                maxWidth: "lg",
            }}
        >
            <ErrorBoundary
                fallback={
                    <Alert severity={"error"}>
                        <AlertTitle>
                            UH OH!
                        </AlertTitle>
                        A fatal error occurred while rendering this sprite animation.
                        Try saving your work and refreshing the page.
                        You can also report this issue to #bug-reports on the Discord server.
                    </Alert>
                }
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        height: "70vh",
                    }}
                >
                    <AnimatedSpriteTypeList/>
                    <AnimatedSpritePreview/>

                    <AnimatedSpriteFrameList/>
                    <SpriteAnimEditorNoAnimationError/>
                </Box>
            </ErrorBoundary>
        </GenericModal>
    );
}