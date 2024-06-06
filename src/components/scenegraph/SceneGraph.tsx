import { Search } from "@mui/icons-material";
import { Box, Divider, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SceneGraphButtons from "../buttons/SceneGraphButtons";
import SceneGraphElements from "./SceneGraphElements";

export default function SceneGraph() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = React.useState<string>("");

    return (
        <>
            <Box sx={{ padding: 1, marginTop: 6 }}>
                <TextField
                    placeholder={t("edit.search")}
                    variant={"outlined"}
                    size={"small"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
                    }}
                />
            </Box>
            <SceneGraphElements searchQuery={searchQuery.toLowerCase()} />
            <Divider />
            <SceneGraphButtons />
        </>
    );
}