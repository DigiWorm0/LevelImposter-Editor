import React from "react";
import {Box, Divider, List, Typography} from "@mui/material";
import AnimatedSpriteFrameRow from "./AnimatedSpriteFrameRow";
import {ReactSortable} from "react-sortablejs";
import LISpriteAnimationFrame from "../../../../types/li/LISpriteAnimationFrame";
import useSelectedSpriteAnim from "../../../../hooks/spriteAnim/useSelectedSpriteAnim";

export default function AnimatedSpriteFrameList() {
    const [animation, setAnimation] = useSelectedSpriteAnim();

    const frames = animation?.frames || [];
    const setFrames = (newFrames: LISpriteAnimationFrame[]) => {
        if (!animation)
            return;

        setAnimation({...animation, frames: newFrames});
    };

    if (!animation)
        return null;
    return (
        <Box>
            <Typography variant={"subtitle2"}>
                Frames
            </Typography>
            <Divider/>
            <List
                dense
                sx={{
                    overflowY: "auto",
                    height: "100%",
                    padding: 1
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
            <Divider/>
        </Box>
    );
}