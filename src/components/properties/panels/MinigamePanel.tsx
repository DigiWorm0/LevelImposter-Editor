import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { useSelectedMinigameID } from "../../../hooks/jotai/useSelectedMinigame";
import AUMinigameDB from "../../../types/au/AUMinigameDB";
import MinigameEditorPanel from "../editors/MinigameEditorPanel";
import DropdownList from "../util/DropdownList";
import PanelContainer from "../util/PanelContainer";

export default function MinigamePanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();
    const [selectedID, setSelectedID] = useSelectedMinigameID();

    const minigameSprites = React.useMemo(() => AUMinigameDB.filter((mg) => mg.split("_")[0] === element?.type), [element]);

    if (!element || minigameSprites.length === 0)
        return null;

    return (
        <PanelContainer title={t("minigame.title") as string}>
            <DropdownList
                elements={minigameSprites.map((mg) => ({
                    id: mg,
                    name: t(`minigame.${mg.split("_")[1]}`) as string,
                    icon: 'code-block',
                    intent: element.properties.minigames?.find((m) => m.id === mg)?.spriteData ? 'success' : 'danger'
                }))}
                selectedID={selectedID}
                onSelectID={setSelectedID}
            >
                <MinigameEditorPanel />
            </DropdownList>
        </PanelContainer>
    );
}
