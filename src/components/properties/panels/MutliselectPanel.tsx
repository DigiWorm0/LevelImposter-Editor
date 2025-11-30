import useSelectedElementIDs from "../../../hooks/selection/useSelectedElementIDs";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function MultiselectPanel() {
    const [selectedElementIDs] = useSelectedElementIDs();
    const {t} = useTranslation();

    if (selectedElementIDs.length <= 1)
        return null;
    return (
        <Typography
            variant={"body2"}
            color={"textSecondary"}
            sx={{textAlign: "center", mt: 4}}
        >
            {t("edit.multipleSelected", {count: selectedElementIDs.length})}
        </Typography>
    );
}