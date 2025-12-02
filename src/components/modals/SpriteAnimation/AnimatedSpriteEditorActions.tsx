import {RestartAlt, Upload} from "@mui/icons-material";
import {Button, ButtonGroup} from "@mui/material";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import uploadSpriteAnimFrames from "../../../utils/spriteAnim/uploadSpriteAnimFrames";
import uploadSpriteAnimGIF from "../../../utils/spriteAnim/uploadSpriteAnimGIF";

export function AnimatedSpriteEditorActions() {
    const [, setAnimations] = useSelectedElemProp("animations");

    return (
        <ButtonGroup
            fullWidth
            sx={{mt: 1}}
        >
            <Button
                startIcon={<Upload/>}
                variant={"outlined"}
                size={"small"}
                onClick={() => uploadSpriteAnimFrames()}
            >
                Upload Frames
            </Button>
            <Button
                startIcon={<Upload/>}
                variant={"outlined"}
                size={"small"}
                onClick={() => uploadSpriteAnimGIF()}
            >
                Upload GIF
            </Button>
            <Button
                startIcon={<RestartAlt/>}
                variant={"outlined"}
                size={"small"}
                color={"error"}
                onClick={() => setAnimations(undefined)}
            >
                Reset
            </Button>
        </ButtonGroup>
    );
}