import { Button, ButtonGroup, H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import openUploadDialog from "../../../hooks/openUploadDialog";
import DevInfo from "../../utils/DevInfo";
import SizeTag from "../../utils/SizeTag";

interface MinigameEditorPanelProps {
    minigameType: string;
    setSelectedMinigameType: (type: string | undefined) => void;
}

export default function MinigameEditorPanel(props: MinigameEditorPanelProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const minigameType = props.minigameType;
    const minigame = React.useMemo(() => {
        return selectedElem?.properties.minigames?.find(mg => mg.type === minigameType);
    }, [selectedElem, props.minigameType]);

    const onDeleteClick = React.useCallback(() => {
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

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("image/*").then((b64) => {
            if (!selectedElem)
                return;
            const minigameList = selectedElem.properties.minigames?.map(mg => {
                if (mg.id === minigame?.id)
                    return {
                        ...mg,
                        spriteData: b64
                    }
                return mg;
            }) ?? [];
            // If the minigame is not in the list, add it
            if (!minigameList?.find(mg => mg.type === minigameType)) {
                minigameList?.push({
                    id: generateGUID(),
                    type: minigameType,
                    spriteData: b64
                });
            }
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    minigames: minigameList
                }
            });
        })
    }, [selectedElem, minigame, setSelectedElem]);

    const spriteURL = React.useMemo(() => minigame?.spriteData ?? `/minigames/${minigameType}.png`, [minigame]);
    const spriteSize = React.useMemo(() => minigame?.spriteData ? spriteURL.length : 0, [spriteURL]);

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

            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={spriteURL}
                    alt={selectedElem.name}
                />
            </div>
            <div style={{ textAlign: "center", paddingBottom: 10 }}>
                <SizeTag
                    sizeBytes={spriteSize}
                    warningMsg={t("sprite.errorSize") as string}
                    okMsg={t("sprite.okSize") as string}
                />
            </div>

            <ButtonGroup fill>
                <Button
                    icon="cloud-upload"
                    intent="primary"
                    onClick={() => onUploadClick()}
                    style={{ margin: 3 }}
                />
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => props.setSelectedMinigameType(undefined)}
                    style={{ margin: 3 }}
                />
                <Button
                    icon="refresh"
                    intent="danger"
                    onClick={() => onDeleteClick()}
                    style={{ margin: 3 }}
                    disabled={!minigame}
                />
            </ButtonGroup>
        </div>
    )
}