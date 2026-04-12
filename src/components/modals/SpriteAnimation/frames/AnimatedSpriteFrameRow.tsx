import React from "react";
import {Delete, DragHandle} from "@mui/icons-material";
import {ButtonGroup, IconButton, InputAdornment, ListItem} from "@mui/material";
import FlexNumericInput from "../../../properties/util/FlexNumericInput";
import LISpriteAnimationFrame from "../../../../types/li/LISpriteAnimationFrame";
import useSpriteThumbnail from "../../../../hooks/sprites/useSpriteThumbnail";
import SpriteDownloadPNGButton from "../../../buttons/SpriteDownloadPNGButton";
import SpriteDownloadRawButton from "../../../buttons/SpriteDownloadRawButton";

export interface AnimatedSpriteFrameRowProps {
    frame: LISpriteAnimationFrame;
    onChange: (frame: LISpriteAnimationFrame) => void;
    onDelete: () => void;
}

export default function AnimatedSpriteFrameRow(props: AnimatedSpriteFrameRowProps) {
    const thumbnail = useSpriteThumbnail(props.frame.spriteID);
    const [isHovering, setIsHovering] = React.useState<boolean>(false);

    return (
        <ListItem
            sx={{
                backgroundColor: isHovering ? "action.hover" : "inherit",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            disableGutters
        >
            <DragHandle
                className={"drag-handle"}
                sx={{
                    ml: 1,
                    mr: 1,
                    cursor: "grab"
                }}
            />

            {thumbnail && (
                <img
                    src={thumbnail.src}
                    width={thumbnail.width}
                    height={thumbnail.height}
                    style={{
                        maxWidth: 40,
                        maxHeight: 40,
                        width: "auto",
                        height: "auto",
                        marginLeft: 10,
                        marginRight: 10
                    }}
                    alt="Frame Preview"
                />
            )}
            <FlexNumericInput
                value={props.frame.delay}
                onChange={(value) => {
                    props.onChange({
                        ...props.frame,
                        delay: value
                    });
                }}
                inputProps={{
                    size: "small",
                    label: "Delay",
                    InputProps: {
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                ms
                            </InputAdornment>
                        )
                    }
                }}
            />

            <ButtonGroup
                sx={{ml: 1, mr: 1}}
            >
                <SpriteDownloadRawButton assetID={props.frame.spriteID} small/>
                <SpriteDownloadPNGButton assetID={props.frame.spriteID} small/>

                <IconButton
                    size={"small"}
                    onClick={props.onDelete}
                >
                    <Delete/>
                </IconButton>
            </ButtonGroup>

        </ListItem>
    );
}