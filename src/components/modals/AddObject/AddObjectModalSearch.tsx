import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AddObjectModalSearch() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useSearchQuery();

    return (
        <TextField
            variant="outlined"
            fullWidth
            autoFocus
            placeholder={t("object.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
                startAdornment: <InputAdornment position={"start"}><Search /></InputAdornment>
            }}
        />
    )
}