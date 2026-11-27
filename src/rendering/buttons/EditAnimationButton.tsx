import React from "react";
import {useAtom} from "jotai";
import {isSpriteAnimEditorOpenAtom} from "@editor/spriteAnim/spriteAnimStore";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Animation} from "@mui/icons-material";

export default function EditAnimationButton() {
    const {t} = useTranslation();
    const [isAnimEditorOpen, setAnimEditorOpen] = useAtom(isSpriteAnimEditorOpenAtom);

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
    );
}
