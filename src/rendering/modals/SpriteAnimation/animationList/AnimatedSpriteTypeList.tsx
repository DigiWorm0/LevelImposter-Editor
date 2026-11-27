import React from "react";
import {List} from "@mui/material";
import AnimatedSpriteTypeButton from "./AnimatedSpriteTypeButton";
import {useAtomValue} from "jotai";
import {availableSpriteAnimTypesAtom} from "@editor/spriteAnim/availableSpriteAnimTypes";
import {activeSpriteAnimTypeAtom} from "@editor/spriteAnim/spriteAnimStore";
import {selectSpriteAnim} from "@editor/selection/selectSpriteAnim";


export default function AnimatedSpriteTypeList() {
    const availableTypes = useAtomValue(availableSpriteAnimTypesAtom);
    const selectedType = useAtomValue(activeSpriteAnimTypeAtom);

    return (
        <List
            dense
            sx={{
                maxHeight: "70vh",
                overflowY: "auto",
                overflowX: "hidden",
                minWidth: 200,
            }}
        >
            {availableTypes.map(type => (
                <AnimatedSpriteTypeButton
                    key={type}
                    type={type}
                    active={selectedType === type}
                    onClick={() => selectSpriteAnim(undefined, type)}
                />
            ))}
        </List>
    );
}
