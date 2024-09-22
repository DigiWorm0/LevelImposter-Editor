import React from "react";
import {useTranslation} from "react-i18next";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import AUTextDB from "../../../db/AUTextDB";
import {useSelectedElemPropValue} from "../../../hooks/elements/useSelectedElemProperty";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import {Notes, OpenInNew} from "@mui/icons-material";
import DropdownList from "../util/DropdownList";
import CustomTextEditorPanel from "../editors/CustomTextEditorPanel";

export default function CustomTextPanel() {
    const {t} = useTranslation();
    const selectedType = useSelectedElemType();
    const customText = useSelectedElemPropValue("customText");
    const [selectedTextID, setSelectedTextID] = React.useState<string | undefined>(undefined);

    const customTextIDs = AUTextDB[selectedType ?? ""] ?? [];

    if (customTextIDs.length === 0)
        return null;
    return (
        <>
            <PanelContainer title={t("customText.title")}>
                <DropdownList
                    elements={customTextIDs.map(id => ({
                        id,
                        name: t(`customText.${id}`).replaceAll("\n", " "),
                        intent: customText?.[id] ? "success" : "error"
                    }))}
                    onSelectID={setSelectedTextID}
                    selectedID={selectedTextID}
                    renderElement={(element) => (
                        <CustomTextEditorPanel id={element.id}/>
                    )}
                />
            </PanelContainer>
            <MapError
                info
                icon={<Notes/>}
                buttonIcon={<OpenInNew/>}
                buttonText={t("customText.learnMore")}
                onButtonClick={() => window.open("http://digitalnativestudios.com/textmeshpro/docs/rich-text/")}
            >
                {t("customText.customTextInfo")}
            </MapError>
        </>
    );
}
