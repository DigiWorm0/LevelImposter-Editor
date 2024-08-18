import ElementSelect from "../properties/input/select/ElementSelect";
import {useTranslation} from "react-i18next";
import React from "react";
import TimelineRow from "./TimelineRow";
import useSelectedElemProp from "../../hooks/elements/useSelectedElemProperty";
import generateGUID from "../../utils/strings/generateGUID";
import LIElement from "../../types/li/LIElement";

export default function TimelineAddRow() {
    const {t} = useTranslation();
    const [animTargets, setAnimTargets] = useSelectedElemProp("animTargets");

    const addAnimTarget = (elem: LIElement) => {
        setAnimTargets([
            ...(animTargets ?? []),
            {
                id: generateGUID(),
                elementID: elem.id,
                keyframes: [],
            }
        ]);
    };

    return (
        <TimelineRow
            header={(
                <ElementSelect
                    typeFilter={"util-blanktrigger"}
                    noElementsText={t("anim.noTargets")}
                    defaultText={t("anim.selectTarget")}
                    selectedID={undefined}
                    onPick={addAnimTarget}
                    blacklistedIDs={animTargets?.map((t) => t.elementID)}
                    placement={"top"}
                    onReset={() => {
                    }}
                />
            )}
        >

        </TimelineRow>
    );
}