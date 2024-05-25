import { QuestionMark } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/elements/useSelectedElem";
import InputGroup from "./InputGroup";

export default function DoorTypeSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem)
        return null;

    return (
        <Box
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <InputGroup>
                <Select
                    size={"small"}
                    value={selectedElem.properties.doorType}
                    onChange={(e) => {
                        setSelectedElem({
                            ...selectedElem,
                            properties: { ...selectedElem.properties, doorType: e.target.value }
                        });
                    }}
                    style={{
                        width: "100%"
                    }}
                >
                    <MenuItem value="skeld">{t("door.skeld")}</MenuItem>
                    <MenuItem value="polus">{t("door.polus")}</MenuItem>
                    <MenuItem value="airship">{t("door.airship")}</MenuItem>

                </Select>
                <Tooltip
                    color="primary"
                    title={t("door.globalInfo") as string}
                >
                    <IconButton
                        color="primary"
                        style={{ cursor: "help" }}
                    >
                        <QuestionMark />
                    </IconButton>
                </Tooltip>
            </InputGroup>
        </Box>
    )
}