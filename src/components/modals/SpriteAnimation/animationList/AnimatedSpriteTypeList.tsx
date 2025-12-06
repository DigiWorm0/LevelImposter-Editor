import React from "react";
import {List} from "@mui/material";
import AnimatedSpriteTypeButton from "./AnimatedSpriteTypeButton";
import useAvailableSpriteAnimTypes from "../../../../hooks/spriteAnim/useAvailableSpriteAnimTypes";
import useSelectedSpriteAnimType from "../../../../hooks/spriteAnim/useSelectedSpriteAnimType";


export default function AnimatedSpriteTypeList() {
    const availableTypes = useAvailableSpriteAnimTypes();
    const [selectedType, setSelectedType] = useSelectedSpriteAnimType();

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
                    onClick={() => setSelectedType(type)}
                />
            ))}
        </List>
    );
}