import React from "react";
import {Box, Divider, List, Typography} from "@mui/material";
import AnimatedSpriteFrameRow from "./AnimatedSpriteFrameRow";
import {ReactSortable} from "react-sortablejs";
import LISpriteAnimationFrame from "@/map-format/LISpriteAnimationFrame";
import {useAtom} from "jotai";
import {selectedSpriteAnimAtom} from "@editor/spriteAnim/spriteAnimStore";

export default function AnimatedSpriteFrameList() {
    const [animation, setAnimation] = useAtom(selectedSpriteAnimAtom);

    const frames = animation?.frames || [];
    const setFrames = (newFrames: LISpriteAnimationFrame[]) => {
        if (!animation)
            return;

        setAnimation({...animation, frames: newFrames});
    };

    const reorderFrames = (items: Pick<LISpriteAnimationFrame, "id">[]) => {
        if (items.length !== frames.length || items.every(({id}, index) => id === frames[index].id))
            return;

        const framesByID = new Map(frames.map(frame => [frame.id, frame]));
        const reorderedFrames = items.flatMap(({id}) => framesByID.get(id) ?? []);
        if (reorderedFrames.length === frames.length)
            setFrames(reorderedFrames);
    };

    if (!animation)
        return null;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}
        >
            <Typography variant={"subtitle2"}>
                Frames
            </Typography>
            <Divider/>
            <List
                dense
                sx={{
                    overflowY: "auto",
                    height: "auto"
                }}
            >
                <ReactSortable
                    // Sortable mutates its list items; keep that UI state out of the document.
                    list={frames.map(({id}) => ({id}))}
                    setList={reorderFrames}
                    animation={150}
                    handle={".drag-handle"}
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
