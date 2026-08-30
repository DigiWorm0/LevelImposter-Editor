import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useTranslation} from "react-i18next";
import {auth} from "@/utils/Firebase";
import {docNameAtom, docPropertiesAtom} from "@editor/document/documentStore";
import ThumbnailEdit from "../../utils/ThumbnailEdit";
import {Box, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, TextField} from "@mui/material";
import PublishModalRemixOptions from "./PublishModalRemixOptions";
import {useAtomValue} from "jotai";
import executeCommand from "../../../editor/history/executeCommand";
import {setMapName, setMapProperty} from "@editor/document/mapPropertyCommands";

export default function PublishModalEditor() {
    const {t} = useTranslation();
    const [user] = useAuthState(auth);
    
    const mapName = useAtomValue(docNameAtom);
    const docProperties = useAtomValue(docPropertiesAtom);
    const authorName = docProperties.authorName;
    const description = docProperties.description;
    const isPublic = docProperties.isPublic;

    const setAuthorName = (name: string) => executeCommand(setMapProperty("authorName", name));
    const setMapDescription = (description: string) => executeCommand(setMapProperty("description", description));
    const setIsPublic = (isPublic: boolean) => executeCommand(setMapProperty("isPublic", isPublic));

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
                        onChange={(e) => setMapName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        size={"small"}
                        sx={{mb: 1}}
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
                        onChange={(e) => setMapDescription(e.target.value)}
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
                        onChange={(e) => setIsPublic(e.currentTarget.value === "public")}
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