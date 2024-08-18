import ElementSelect from "../properties/input/select/ElementSelect";
import {useTranslation} from "react-i18next";
import React from "react";
import TimelineRow from "./TimelineRow";

export default function TimelineAddRow() {
    const {t} = useTranslation();

    return (
        <TimelineRow
            header={(
                <ElementSelect
                    typeFilter={"util-blanktrigger"}
                    noElementsText={t("anim.noTargets")}
                    defaultText={t("anim.selectTarget")}
                    selectedID={undefined}
                    onPick={() => {
                    }}
                    onReset={() => {
                    }}
                />
            )}
        >

        </TimelineRow>
    );
}