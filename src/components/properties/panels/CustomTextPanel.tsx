import React from "react";
import { useTranslation } from "react-i18next";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import AUTextDB from "../../../types/db/AUTextDB";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import { Clear, Notes } from "@mui/icons-material";

export default function CustomTextPanel() {
    const { t } = useTranslation();
    const selectedType = useSelectedElemType();
    const [customText, setCustomText] = useSelectedElemProp("customText")

    const customTextIDs = AUTextDB[selectedType ?? ""] ?? [];

    if (customTextIDs.length === 0)
        return null;
    return (
        <>
            <PanelContainer title={t("customText.title")}>
                {customTextIDs.map((id) => (
                    <TextField
                        key={id}
                        label={t(`customText.${id}`)}
                        placeholder={t(`customText.${id}`)}
                        value={customText?.[id] ?? ""}
                        onChange={(e) => setCustomText({ ...customText, [id]: e.target.value })}
                        fullWidth
                        size={"small"}
                        sx={{ mt: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={"start"}>
                                    <Notes />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <IconButton>
                                        <Clear />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                ))}
            </PanelContainer>
            <MapError
                info
                icon="Notes"
            >
                {t("customText.customTextInfo")}
            </MapError>
        </>
    );
}
