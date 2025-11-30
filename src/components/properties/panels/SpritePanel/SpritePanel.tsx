import React from "react";
import {useTranslation} from "react-i18next";
import PanelContainer from "../../util/PanelContainer";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import StillSpriteErrors from "./still/StillSpriteErrors";
import StillSpritePanel from "./still/StillSpritePanel";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Animation, Image} from "@mui/icons-material";
import AnimatedSpritePanel from "./animated/AnimatedSpritePanel";

const TYPE_BLACKLIST = [
    "util-player",
    "util-room",
    "util-spawn1",
    "util-spawn2",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-layer",
    "util-meeting",
    "util-triggerrepeat",
    "util-triggersound",
    "util-triggerrand",
    "util-triggertimer",
    "util-triggerstart",
    "util-triggeranim",
    "util-dummy",
    "util-display",
    "util-onewaycollider",
    "util-decontamination",
    "util-sabotages",
    "util-binocularscollider",
    "util-ghostcollider",
    "util-eject",
    "util-triggergate",
    "util-valuebool",
    "util-valueboolpreset",
    "util-valuecomparator"
];

export default function SpritePanel() {
    const {t} = useTranslation();
    const selectedType = useSelectedElemType();
    const [spriteMode, setSpriteMode] = React.useState<"still" | "animated">("still");

    if (!selectedType || TYPE_BLACKLIST.includes(selectedType))
        return null;

    return (
        <>
            <PanelContainer title={t("sprite.title") as string}>

                {spriteMode === "still" && <StillSpritePanel/>}
                {spriteMode === "animated" && <AnimatedSpritePanel/>}

                <ToggleButtonGroup
                    value={spriteMode}
                    exclusive
                    onChange={(_, value) => {
                        if (value !== null) setSpriteMode(value);
                    }}
                    size="small"
                    fullWidth
                    sx={{
                        mb: 1,
                        height: 30,
                    }}
                >
                    <ToggleButton value="still" color={"primary"}>
                        <Image
                            sx={{mr: 0.5}}
                        />
                        {t("sprite.still")}
                    </ToggleButton>
                    <ToggleButton value="animated" color={"secondary"}>
                        <Animation
                            sx={{mr: 0.5}}
                        />
                        {t("sprite.animated")}
                    </ToggleButton>
                </ToggleButtonGroup>
            </PanelContainer>

            {spriteMode === "still" && <StillSpriteErrors/>}
        </>
    );
}
