import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../../hooks/elements/useSelectedElem";
import ElementSelect from "./ElementSelect";

export default function TeleSelect() {
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
            <ElementSelect
                typeFilter="util-tele"
                noElementsText={t("tele.errorNoTeles") as string}
                defaultText={t("tele.noConnection")}
                selectedID={selectedElem.properties.teleporter}
                onPick={(vent) => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, teleporter: vent.id }
                    });
                }}
                onReset={() => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, teleporter: undefined }
                    });
                }}
            />
        </Box>
    )
}