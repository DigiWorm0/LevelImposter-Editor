import { Button, ButtonGroup, H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import useSelectedMinigame, { useSelectedMinigameID } from "../../../hooks/jotai/useSelectedMinigame";
import openUploadDialog from "../../../hooks/openUploadDialog";
import DevInfo from "../../utils/DevInfo";
import SizeTag from "../../utils/SizeTag";

export default function MinigameEditorPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedMinigameID, setSelectedMinigameID] = useSelectedMinigameID();
    const [selectedMinigame, setSelectedMinigame] = useSelectedMinigame();

    const onDeleteClick = React.useCallback(() => {
        if (!selectedElem)
            return;
        const minigames = selectedElem.properties.minigames?.filter(minigame => minigame.id !== selectedMinigameID);
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                minigames
            }
        });
    }, [selectedElem, selectedMinigameID, setSelectedElem]);

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("image/*").then((b64) => {
            if (!selectedMinigame)
                return;
            setSelectedMinigame({
                ...selectedMinigame,
                spriteData: b64
            });
        })
    }, [selectedMinigame, setSelectedMinigame]);

    const spriteURL = React.useMemo(() => selectedMinigame?.spriteData ?? `/minigames/${selectedMinigameID}.png`, [selectedMinigame]);
    const spriteSize = React.useMemo(() => selectedMinigame?.spriteData ? spriteURL.length : 0, [spriteURL]);

    if (!selectedMinigame || !selectedElem)
        return null;

    return (
        <div style={{ padding: 20 }}>
            <H6>
                {t(`minigame.${selectedMinigameID?.split("_")[1]}`)}
            </H6>
            <DevInfo>
                {selectedMinigame?.id}
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
                    onClick={() => setSelectedMinigameID(undefined)}
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