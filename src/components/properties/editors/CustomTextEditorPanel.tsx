import { Clear } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import ColoredTextPreview from "../../utils/ColoredTextPreview";

interface CustomTextEditorPanelProps {
    id: string;
}

export default function CustomTextEditorPanel(props: CustomTextEditorPanelProps) {
    const { t } = useTranslation();
    const [customText, setCustomText] = useSelectedElemProp("customText");

    const clearText = React.useCallback(() => {
        setCustomText({ ...customText, [props.id]: "" });
    }, [customText, props.id, setCustomText]);

    return (
        <Box sx={{ padding: 1 }}>

            <Typography
                variant={"body2"}
                color={"textPrimary"}
                sx={{ textAlign: "center" }}
            >
                <ColoredTextPreview>
                    {t(`customText.${props.id}`)}
                </ColoredTextPreview>
            </Typography>

            <TextField
                label={props.id}
                value={customText?.[props.id] ?? ""}
                onChange={(e) => setCustomText({ ...customText, [props.id]: e.target.value })}
                fullWidth
                size={"small"}
                sx={{ mt: 1 }}
                multiline
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={clearText}>
                                <Clear />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
}