import { FormGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import ElementSelect from "./ElementSelect";
import LIProperties from "../../../types/li/LIProperties";
import { MaybeGUID } from "../../../types/generic/GUID";

export default function DoorSelect(props: { prop: keyof LIProperties }) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem)
        return null;

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <ElementSelect
                typeFilter="sab-door"
                noElementsText={t("door.errorNoDoors")}
                defaultText={t("door.none")}
                selectedID={selectedElem.properties[props.prop] as MaybeGUID}
                onPick={(door) => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, [props.prop]: door.id }
                    });
                }}
                onReset={() => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, [props.prop]: undefined }
                    });
                }}
            />
        </FormGroup>
    )
}