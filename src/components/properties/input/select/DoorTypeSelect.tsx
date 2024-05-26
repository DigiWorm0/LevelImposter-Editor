import { QuestionMark } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import InputGroup from "../InputGroup";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export default function DoorTypeSelect() {
    const { t } = useTranslation();
    const [doorType, setDoorType] = useSelectedElemProp("doorType");

    return (
        <InputGroup>
            <Select
                size={"small"}
                value={doorType}
                onChange={(e) => setDoorType(e.target.value)}
                style={{ width: "100%" }}
            >
                <MenuItem value="skeld">{t("door.skeld")}</MenuItem>
                <MenuItem value="polus">{t("door.polus")}</MenuItem>
                <MenuItem value="airship">{t("door.airship")}</MenuItem>

            </Select>
            <Tooltip title={t("door.globalInfo") as string}>
                <IconButton
                    color="inherit"
                    style={{ cursor: "help" }}
                >
                    <QuestionMark />
                </IconButton>
            </Tooltip>
        </InputGroup>
    )
}