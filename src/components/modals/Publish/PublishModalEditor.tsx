import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../../utils/Firebase";
import { useMapAuthorName, useMapDescription, useMapIsPublic, useMapName } from "../../../hooks/map/useMap";
import ThumbnailEdit from "../../utils/ThumbnailEdit";
import { Box, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from "@mui/material";

export default function PublishModalEditor() {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);

    // Edit Hooks
    const [mapName, setMapName] = useMapName();
    const [description, setDescription] = useMapDescription();
    const [authorName, setAuthorName] = useMapAuthorName();
    const [isPublic, setIsPublic] = useMapIsPublic();

    return (
        <Box>
            <ThumbnailEdit />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <RadioGroup
                    row
                    onChange={(e) => setIsPublic(e.currentTarget.value === "public")}
                    value={isPublic ? "public" : "private"}
                >
                    <FormControlLabel
                        control={<Radio color={"success"} />}
                        label={t("publish.public")}
                        value="public"
                    />
                    <FormControlLabel
                        control={<Radio color={"error"} />}
                        label={t("publish.private")}
                        value="private"
                    />
                </RadioGroup>
            </Box>
            <Box sx={{ p: 1, ps: 2, pe: 2 }}>
                <TextField
                    fullWidth
                    sx={{ mb: 1 }}
                    placeholder={t("publish.mapName")}
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                />
                <TextField
                    fullWidth
                    sx={{ mb: 1 }}
                    placeholder={t("publish.authorName")}
                    value={authorName || user?.displayName || "Anonymous"}
                    onChange={(e) => setAuthorName(e.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position={"start"}>by </InputAdornment>),
                    }}
                />
                <TextField
                    fullWidth
                    size={"small"}
                    placeholder={t("publish.mapDescription")}
                    multiline
                    maxRows={12}
                    minRows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
        </Box>
    );
}