import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import ElementSelect from "../input/select/ElementSelect";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import useIsSelectedElemType from "../../../hooks/elements/useIsSelectedElemType";

export default function GatePanel() {
    const {t} = useTranslation();
    const isGate = useIsSelectedElemType("util-triggergate");
    const [selectedValueID, setSelectedValueID] = useSelectedElemProp("triggerGateValueID");

    if (!isGate)
        return null;

    return (
        <PanelContainer title={t("triggergate.title") as string}>
            <ElementSelect
                label={t("triggergate.value")}
                typeFilter={"util-valuebool"}
                noElementsText={t("triggergate.noValues")}
                defaultText={t("triggergate.selectValue")}
                selectedID={selectedValueID}
                onPick={(elem) => setSelectedValueID(elem.id)}
                onReset={() => setSelectedValueID(undefined)}
            />
        </PanelContainer>
    );
}
