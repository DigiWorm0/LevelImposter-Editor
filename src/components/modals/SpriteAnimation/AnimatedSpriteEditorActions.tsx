import {RestartAlt, Upload} from "@mui/icons-material";
import {Button, ButtonGroup} from "@mui/material";
import uploadSpriteAnimFrames from "../../../utils/spriteAnim/uploadSpriteAnimFrames";
import uploadSpriteAnimGIF from "../../../utils/spriteAnim/uploadSpriteAnimGIF";
import useSelectedSpriteAnim from "../../../hooks/spriteAnim/useSelectedSpriteAnim";

export function AnimatedSpriteEditorActions() {
    const [, setAnimation] = useSelectedSpriteAnim();

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
                onClick={() => setAnimation(undefined)}
            >
                Reset
            </Button>
        </ButtonGroup>
    );
}