import ElementSelect from "../properties/input/select/ElementSelect";
import {useTranslation} from "react-i18next";
import React from "react";
import TimelineRow from "./TimelineRow";
import useSelectedElemProp from "../../hooks/elements/useSelectedElemProperty";
import useAddAnimTarget from "../../hooks/timeline/useAddAnimTarget";

export default function TimelineAddRow() {
    const {t} = useTranslation();
    const [animTargets,] = useSelectedElemProp("animTargets");
    const addAnimTarget = useAddAnimTarget();

    return (
        <TimelineRow
            header={(
                <ElementSelect
                    typeFilter={"util-blanktrigger"}
                    noElementsText={t("anim.noTargets")}
                    defaultText={t("anim.selectTarget")}
                    selectedID={undefined}
                    onPick={(elem) => addAnimTarget(elem.id)}
                    blacklistedIDs={animTargets?.map((t) => t.id)}
                    placement={"top"}
                    onReset={() => {
                    }}
                />
            )}
        >

        </TimelineRow>
    );
}