import {Delete, DragHandle} from "@mui/icons-material";
import {Box, IconButton, InputAdornment, ListItem} from "@mui/material";
import FlexNumericInput from "../../../properties/util/FlexNumericInput";
import LISpriteAnimationFrame from "../../../../types/li/LISpriteAnimationFrame";
import {useMapAssetValue} from "../../../../hooks/assets/useMapAsset";
import useSprite from "../../../../hooks/canvas/sprite/useSprite";
import SpriteWindow from "../../../properties/util/SpriteWindow";

export interface AnimatedSpriteFrameRowProps {
    frame: LISpriteAnimationFrame;
    onChange: (frame: LISpriteAnimationFrame) => void;
    onDelete: () => void;
}

export default function AnimatedSpriteFrameRow(props: AnimatedSpriteFrameRowProps) {
    const asset = useMapAssetValue(props.frame.spriteID);
    const sprite = useSprite(asset?.url);

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

            <SpriteWindow
                sprite={sprite}
                maxSize={50}
            />

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