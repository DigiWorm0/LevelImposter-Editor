import React from "react";
import { useTranslation } from "react-i18next";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import AUTextDB from "../../../types/db/AUTextDB";
import { TextField } from "@mui/material";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import LICustomText from "../../../types/li/LICustomText";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";

export default function CustomTextPanel() {
    const { t } = useTranslation();
    const selectedType = useSelectedElemType();
    const [customText, setCustomText] = useSelectedElemProp<LICustomText>("customText")

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
                        value={customText?.[id] ?? ""}
                        onChange={(e) => setCustomText({ ...customText, [id]: e.target.value })}
                        fullWidth
                        size={"small"}
                        sx={{ mt: 1 }}
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
