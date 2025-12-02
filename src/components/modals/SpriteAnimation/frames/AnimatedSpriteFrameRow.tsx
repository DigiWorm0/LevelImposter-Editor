import {Delete, DragHandle} from "@mui/icons-material";
import {Box, IconButton, InputAdornment, ListItem} from "@mui/material";
import FlexNumericInput from "../../../properties/util/FlexNumericInput";
import LISpriteAnimationFrame from "../../../../types/li/LISpriteAnimationFrame";
import useSpriteThumbnail from "../../../../hooks/sprites/useSpriteThumbnail";

export interface AnimatedSpriteFrameRowProps {
    frame: LISpriteAnimationFrame;
    onChange: (frame: LISpriteAnimationFrame) => void;
    onDelete: () => void;
}

export default function AnimatedSpriteFrameRow(props: AnimatedSpriteFrameRowProps) {
    const thumbnail = useSpriteThumbnail(props.frame.spriteID);

    return (
        <ListItem
            disableGutters
        >
            <DragHandle/>

            <Box sx={{ml: 2, mr: 2}}>
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
            </Box>

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
                    }}
                    alt="Frame Preview"
                />
            )}

            <IconButton
                size={"small"}
                sx={{ml: 2}}
                onClick={props.onDelete}
            >
                <Delete/>
            </IconButton>

        </ListItem>
    );
}