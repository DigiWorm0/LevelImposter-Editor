import { FormGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import ElementSelect from "./ElementSelect";

export default function VentSelect(props: { prop: "leftVent" | "middleVent" | "rightVent" }) {
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
                typeFilter="util-vent"
                noElementsText={t("vent.errorNoVents")}
                defaultText={t("vent.noConnection")}
                selectedID={selectedElem.properties[props.prop]}
                onPick={(vent) => {
                    setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, [props.prop]: vent.id } });
                }}
                onReset={() => {
                    setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, [props.prop]: undefined } });
                }}
                blacklistedIDs={[
                    selectedElem.properties.leftVent,
                    selectedElem.properties.middleVent,
                    selectedElem.properties.rightVent
                ]}
            />
        </FormGroup>
    )
}