import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import PanelContainer from "../util/PanelContainer";
import React from "react";
import DoorSelect from "../input/DoorSelect";

export default function DecontaminationPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-decontamination")
        return null;

    return (
        <>
            <PanelContainer title={t("decontamination.title") as string}>
                <DoorSelect prop={"doorA"} />
                <DoorSelect prop={"doorB"} />
            </PanelContainer>
        </>
    );
}
