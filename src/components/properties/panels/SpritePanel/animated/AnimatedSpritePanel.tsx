import {Box, Button} from "@mui/material";
import LazyCollapse from "../../../util/LazyCollapse";
import AnimatedSpriteFrameList from "./AnimatedSpriteFrameList";
import AnimatedCaretIcon from "../../../../utils/AnimatedCaretIcon";
import React from "react";

export default function AnimatedSpritePanel() {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    return (
        <Box>

            <Button
                fullWidth
                onClick={() => setIsCollapsed(!isCollapsed)}
                endIcon={<AnimatedCaretIcon up={!isCollapsed}/>}
            >
                Frames
            </Button>

            <LazyCollapse in={isCollapsed}>
                <AnimatedSpriteFrameList/>
            </LazyCollapse>
        </Box>
    );
}