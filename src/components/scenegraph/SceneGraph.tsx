import React from "react";
import { useTranslation } from "react-i18next";
import { useElementChildren } from "../../hooks/map/elements/useElements";
import SceneGraphButtons from "../buttons/SceneGraphButtons";
import SceneGraphElement from "./SceneGraphElement";
import { Box, Divider, InputAdornment, List, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SceneGraph() {
    const { t } = useTranslation();
    const elementIDs = useElementChildren(undefined);
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
            <List
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                }}
            >
                {elementIDs.map((elemID) => (
                    <SceneGraphElement
                        key={elemID}
                        elementID={elemID}
                        searchQuery={searchQuery}
                        depth={0}
                    />
                ))}
            </List>
            <Divider />
            <SceneGraphButtons />
        </>
    );
}