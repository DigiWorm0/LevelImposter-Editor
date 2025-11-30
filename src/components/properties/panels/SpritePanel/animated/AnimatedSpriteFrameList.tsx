import React from "react";
import {Button, List} from "@mui/material";
import AnimatedSpriteFrameRow from "./AnimatedSpriteFrameRow";
import {AddPhotoAlternate} from "@mui/icons-material";
import {ReactSortable} from "react-sortablejs";
import LISpriteAnimationFrame from "../../../../../types/li/LISpriteAnimationFrame";
import useSelectedElemProp from "../../../../../hooks/elements/useSelectedElemProperty";

export default function AnimatedSpriteFrameList() {
    const [animation, setAnimation] = useSelectedElemProp("animation");

    const frames = animation?.frames.map((frame, index) => ({...frame, id: index})) || [];
    const setFrames = (newFrames: LISpriteAnimationFrame[]) => {
        if (!animation)
            return;

        setAnimation({...animation, frames: newFrames});
    };

    return (
        <List dense>
            <ReactSortable
                list={frames}
                setList={setFrames}
                animation={150}
            >
                {frames.map((frame, index) => (
                    <AnimatedSpriteFrameRow
                        key={index}
                        frame={frame}
                        onChange={(newFrame) => {
                            const newFrames = [...frames] as LISpriteAnimationFrame[];
                            newFrames[index] = newFrame;
                            setFrames(newFrames);
                        }}
                        onDelete={() => {
                            const newFrames = frames.filter((_, i) => i !== index);
                            setFrames(newFrames);
                        }}
                    />
                ))}
            </ReactSortable>

            <Button
                startIcon={<AddPhotoAlternate/>}
                fullWidth
                variant={"outlined"}
                size={"small"}
                sx={{mt: 1}}
            >
                Add Frames
            </Button>
        </List>
    );
}