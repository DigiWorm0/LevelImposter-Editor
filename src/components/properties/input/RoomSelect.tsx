import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import ElementSelect from "./ElementSelect";
import { Box } from "@mui/material";

export default function RoomSelect(props: { useDefault: boolean }) {
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
                typeFilter="util-room"
                noElementsText={t("room.errorNoRooms")}
                defaultText={props.useDefault ? t("room.default") : t("room.none")}
                selectedID={selectedElem.properties.parent}
                onPick={(room) => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, parent: room.id }
                    });
                }}
                onReset={() => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, parent: undefined }
                    });
                }}
            />
        </Box>
    )
}