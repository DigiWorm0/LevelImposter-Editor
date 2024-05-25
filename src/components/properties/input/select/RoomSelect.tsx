import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../../hooks/elements/useSelectedElem";
import ElementSelect from "./ElementSelect";

export interface RoomSelectProps {
    useDefault: boolean;
    label?: string;
}

export default function RoomSelect(props: RoomSelectProps) {
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
                label={props.label}
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