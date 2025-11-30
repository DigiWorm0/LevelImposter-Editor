import React from "react";
import {List} from "@mui/material";
import AnimatedSpriteFrameRow from "./AnimatedSpriteFrameRow";
import {ReactSortable} from "react-sortablejs";
import LISpriteAnimationFrame from "../../../../types/li/LISpriteAnimationFrame";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export default function AnimatedSpriteFrameList() {
    const [animation, setAnimation] = useSelectedElemProp("animation");

    const frames = animation?.frames || [];
    const setFrames = (newFrames: LISpriteAnimationFrame[]) => {
        if (!animation)
            return;

        setAnimation({...animation, frames: newFrames});
    };

    return (
        <List
            dense
            sx={{
                maxHeight: "70vh",
                overflowY: "auto",
            }}
        >
            <ReactSortable
                list={frames}
                setList={setFrames}
                animation={150}
            >
                {frames.map(frame => (
                    <AnimatedSpriteFrameRow
                        key={frame.id}
                        frame={frame}
                        onChange={(newFrame) => {
                            const newFrames = frames.map(f => f.id === newFrame.id ? newFrame : f);
                            setFrames(newFrames);
                        }}
                        onDelete={() => {
                            const newFrames = frames.filter(f => f.id !== frame.id);
                            setFrames(newFrames);
                        }}
                    />
                ))}
            </ReactSortable>
        </List>
    );
}