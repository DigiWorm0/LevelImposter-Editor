import { Button, ButtonGroup, H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import openUploadDialog from "../../../hooks/openUploadDialog";
import DevInfo from "../../utils/DevInfo";
import SizeTag from "../../utils/SizeTag";

interface MinigameEditorPanelProps {
    minigameID: string;
    setSelectedMinigameID: (id: string | undefined) => void;
}

export default function MinigameEditorPanel(props: MinigameEditorPanelProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const minigameID = props.minigameID;
    const minigame = React.useMemo(() => {
        return selectedElem?.properties.minigames?.find(mg => mg.id === minigameID);
    }, [selectedElem, props.minigameID]);

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
                if (mg.id === minigameID)
                    return {
                        ...mg,
                        spriteData: b64
                    }
                return mg;
            }) ?? [];
            // If the minigame is not in the list, add it
            if (!minigameList?.find(mg => mg.id === minigameID)) {
                minigameList?.push({
                    id: minigameID,
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

    const spriteURL = React.useMemo(() => minigame?.spriteData ?? `/minigames/${minigameID}.png`, [minigame]);
    const spriteSize = React.useMemo(() => minigame?.spriteData ? spriteURL.length : 0, [spriteURL]);

    if (!selectedElem)
        return null;

    return (
        <div style={{ padding: 20 }}>
            <H6>
                {t(`minigame.${minigameID?.split("_")[1]}`)}
            </H6>
            <DevInfo>
                {minigame?.id}
            </DevInfo>

            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={spriteURL}
                    alt={selectedElem.name}
                />
            </div>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
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
                    onClick={() => props.setSelectedMinigameID(undefined)}
                    style={{ margin: 3 }}
                />
                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => onDeleteClick()}
                    style={{ margin: 3 }}
                />
            </ButtonGroup>
        </div>
    )
}