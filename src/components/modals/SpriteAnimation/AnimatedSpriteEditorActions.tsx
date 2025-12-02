import {RestartAlt, Upload} from "@mui/icons-material";
import {Button, ButtonGroup} from "@mui/material";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";

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
            >
                Upload Frames
            </Button>
            <Button
                startIcon={<Upload/>}
                variant={"outlined"}
                size={"small"}
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