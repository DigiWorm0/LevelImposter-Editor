import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";

export default function ValuePanel() {
    const {t} = useTranslation();
    const isBoolValue = useIsSelectedElemType("util-valuebool");

    if (!isBoolValue)
        return null;

    return (
        <PanelContainer title={t("value.title") as string}>
            {isBoolValue && (
                <ElementPropSwitch
                    name={t("value.defaultValue")}
                    defaultValue={false}
                    prop="defaultBoolValue"
                />
            )}
        </PanelContainer>
    );
}
