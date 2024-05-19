import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../utils/generateGUID";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import DevInfo from "../../utils/DevInfo";
import ImageUpload from "../util/ImageUpload";
import MapAsset from "../../../types/li/MapAssetDB";

interface MinigameEditorPanelProps {
    minigameType: string;
    onFinish: () => void;
    hideName?: boolean;
}

export default function MinigameEditorPanel(props: MinigameEditorPanelProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const minigameType = props.minigameType;
    const splitMinigameType = minigameType.split("_");

    const minigame = React.useMemo(() => {
        return selectedElem?.properties.minigames?.find(mg => mg.type === minigameType);
    }, [selectedElem, props.minigameType]);

    const onReset = React.useCallback(() => {
        if (!selectedElem)
            return;
        const minigameList = selectedElem.properties.minigames?.filter(minigame => minigame.type !== minigameType) ?? [];
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                minigames: minigameList
            }
        });
    }, [selectedElem, minigameType, setSelectedElem]);

    const onUpload = React.useCallback((asset: MapAsset) => {
        if (!selectedElem)
            return;
        const minigameList = selectedElem.properties.minigames?.map(mg => {
            if (mg.id === minigame?.id)
                return {
                    ...mg,
                    spriteID: asset.id,
                }
            return mg;
        }) ?? [];
        // If the minigame is not in the list, add it
        if (!minigameList?.find(mg => mg.type === minigameType)) {
            minigameList?.push({
                id: generateGUID(),
                type: minigameType,
                spriteID: asset.id,
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


    console.log(splitMinigameType);

    if (!selectedElem)
        return null;

    return (
        <div style={{ padding: 20 }}>
            {!props.hideName && (
                <h6>
                    {t(`minigame.${splitMinigameType[1]}`, { index: splitMinigameType[2] })}
                </h6>
            )}
            <DevInfo>
                {minigame?.id}
                {minigame?.type}
            </DevInfo>

            <ImageUpload
                name={selectedElem.name}
                defaultSpriteURL={`/minigames/${minigameType}.png`}
                assetID={minigame?.spriteID}
                onUpload={onUpload}
                onReset={onReset}
                onFinish={props.onFinish}
            />

        </div>
    )
}