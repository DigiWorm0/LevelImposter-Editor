import { H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import DevInfo from "../../utils/DevInfo";
import ImageUpload from "../util/ImageUpload";

interface MinigameEditorPanelProps {
    minigameType: string;
    onFinish: () => void;
}

export default function MinigameEditorPanel(props: MinigameEditorPanelProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const minigameType = props.minigameType;
    const minigame = React.useMemo(() => {
        return selectedElem?.properties.minigames?.find(mg => mg.type === minigameType);
    }, [selectedElem, props.minigameType]);

    const onReset = React.useCallback(() => {
        if (!selectedElem)
            return;
        const minigameList = selectedElem.properties.minigames?.filter(minigame => minigame.id !== minigame?.id);
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                minigames: minigameList
            }
        });
    }, [selectedElem, minigame, setSelectedElem]);

    const onUpload = React.useCallback((spriteData: string) => {
        if (!selectedElem)
            return;
        const minigameList = selectedElem.properties.minigames?.map(mg => {
            if (mg.id === minigame?.id)
                return {
                    ...mg,
                    spriteData
                }
            return mg;
        }) ?? [];
        // If the minigame is not in the list, add it
        if (!minigameList?.find(mg => mg.type === minigameType)) {
            minigameList?.push({
                id: generateGUID(),
                type: minigameType,
                spriteData
            });
        }
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                minigames: minigameList
            }
        });
    }, [selectedElem, minigame, setSelectedElem]);

    if (!selectedElem)
        return null;

    return (
        <div style={{ padding: 20 }}>
            <H6>
                {t(`minigame.${minigameType?.split("_")[1]}`)}
            </H6>
            <DevInfo>
                {minigame?.id}
                {minigame?.type}
            </DevInfo>

            <ImageUpload
                name={selectedElem.name}
                defaultSpriteURL={`/minigames/${minigameType}.png`}
                spriteURL={minigame?.spriteData}
                onUpload={onUpload}
                onReset={onReset}
                onFinish={props.onFinish}
            />

        </div>
    )
}