import React from "react";
import useSpriteAnimEditorOpen from "../../hooks/spriteAnim/useSpriteAnimEditorOpen";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Animation} from "@mui/icons-material";

export default function EditAnimationButton() {
    const {t} = useTranslation();
    const [isAnimEditorOpen, setAnimEditorOpen] = useSpriteAnimEditorOpen();

    return (
        <Button
            variant={"outlined"}
            color={"secondary"}
            size={"small"}
            fullWidth
            onClick={() => setAnimEditorOpen(true)}
            disabled={isAnimEditorOpen}
        >
            <Animation
                sx={{marginRight: 0.5}}
                fontSize={"small"}
            />
            {t("sprite.editAnimation")}
        </Button>
    )
}