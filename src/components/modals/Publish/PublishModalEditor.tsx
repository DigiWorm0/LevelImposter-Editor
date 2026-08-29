import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useTranslation} from "react-i18next";
import {auth} from "@/utils/Firebase";
import {mapAuthorNameAtom, mapDescriptionAtom, mapIsPublicAtom, mapNameAtom} from "@editor/documentStore";
import ThumbnailEdit from "../../utils/ThumbnailEdit";
import {Box, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, TextField} from "@mui/material";
import PublishModalRemixOptions from "./PublishModalRemixOptions";
import {useAtomValue} from "jotai";
import executeCommand from "../../../editor/history/executeCommand";
import {setAuthorName, setIsPublic, setMapDescription, setMapName} from "@editor/baseMapProperties";

export default function PublishModalEditor() {
    const {t} = useTranslation();
    const [user] = useAuthState(auth);

    // Edit Hooks
    const mapName = useAtomValue(mapNameAtom);
    const description = useAtomValue(mapDescriptionAtom);
    const authorName = useAtomValue(mapAuthorNameAtom);
    const isPublic = useAtomValue(mapIsPublicAtom);

    return (
        <Grid container>
            <Grid size={6}>
                <Box sx={{p: 1, ps: 2, pe: 2}}>
                    <PublishModalRemixOptions/>
                    <TextField
                        fullWidth
                        size={"small"}
                        sx={{mb: 1}}
                        placeholder={t("publish.mapName")}
                        value={mapName}
                        onChange={(e) => executeCommand(setMapName(e.target.value))}
                    />
                    <TextField
                        fullWidth
                        size={"small"}
                        sx={{mb: 1}}
                        placeholder={t("publish.authorName")}
                        value={authorName || user?.displayName || "Anonymous"}
                        onChange={(e) => executeCommand(setAuthorName(e.target.value))}
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
                        onChange={(e) => executeCommand(setMapDescription(e.target.value))}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <RadioGroup
                        row
                        onChange={(e) => executeCommand(setIsPublic(e.currentTarget.value === "public"))}
                        value={isPublic ? "public" : "private"}
                    >
                        <FormControlLabel
                            control={<Radio color={"success"}/>}
                            label={t("publish.public")}
                            value="public"
                        />
                        <FormControlLabel
                            control={<Radio color={"error"}/>}
                            label={t("publish.private")}
                            value="private"
                        />
                    </RadioGroup>
                </Box>
            </Grid>

            <Grid
                size={6}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ThumbnailEdit/>
            </Grid>


        </Grid>
    );
}