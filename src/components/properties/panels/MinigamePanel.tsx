import { H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import AUMinigameDB from "../../../types/au/AUMinigameDB";
import MinigameEditorPanel from "../editors/MinigameEditorPanel";
import ColorPanelInput from "../input/ColorPanelInput";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import MinigameListEditorPanel from "../editors/MinigameListEditorPanel";
import { DEFAULT_ASTEROID_COUNT, DEFAULT_FANS_COUNT, DEFAULT_VENDING_COUNT } from "../../../types/generic/Constants";

export default function MinigamePanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();
    const [selectedMinigameType, setSelectedMinigameType] = React.useState<string | undefined>(undefined);

    const minigameSprites = React.useMemo(() => AUMinigameDB.filter((mg) => mg.split("_")[0] === element?.type), [element]);

    const isReactor = React.useMemo(() => element?.type.startsWith("sab-reactor"), [element]);
    const isLights = React.useMemo(() => element?.type === "sab-electric", [element]);
    const isVending = React.useMemo(() => element?.type === "task-vending", [element]);
    const isWeapons = React.useMemo(() => element?.type === "task-weapons", [element]);
    const isFans = React.useMemo(() => element?.type.startsWith("task-fans"), [element]);

    if (!element || minigameSprites.length === 0)
        return null;

    return (
        <>
            <PanelContainer title={t("minigame.title") as string}>
                <DropdownList
                    elements={minigameSprites.map((type) => ({
                        id: type,
                        name: t(`minigame.${type.split("_")[1]}`) as string,
                        icon: 'code-block',
                        intent: element.properties.minigames?.find((m) => m.type === type)?.spriteData ? 'success' : 'danger'
                    }))}
                    selectedID={selectedMinigameType}
                    onSelectID={setSelectedMinigameType}
                    renderElement={(mg) => (
                        <MinigameEditorPanel
                            key={mg.id}
                            minigameType={mg.id}
                            onFinish={() => setSelectedMinigameType(undefined)}
                        />
                    )}
                />
                {isReactor && (
                    <ColorPanelInput
                        name={t("minigame.reactorColorGood") as string}
                        minigameProp={"reactorColorGood"}
                        defaultValue={{ r: 77, g: 226, b: 255, a: 255 }}
                    />
                )}
                {isReactor && (
                    <ColorPanelInput
                        name={t("minigame.reactorColorBad") as string}
                        minigameProp={"reactorColorBad"}
                        defaultValue={{ r: 255, g: 41, b: 0, a: 255 }}
                    />
                )}
                {isLights && (
                    <ColorPanelInput
                        name={t("minigame.lightsColorOn") as string}
                        minigameProp={"lightsColorOn"}
                        defaultValue={{ r: 0, g: 255, b: 0, a: 255 }}
                    />
                )}
                {isLights && (
                    <ColorPanelInput
                        name={t("minigame.lightsColorOff") as string}
                        minigameProp={"lightsColorOff"}
                        defaultValue={{ r: 26, g: 77, b: 26, a: 255 }}
                    />
                )}
                {isVending && (
                    <MinigameListEditorPanel
                        name={t("minigame.vendingItems") as string}
                        defaultCount={DEFAULT_VENDING_COUNT}
                        typePrefix="task-vending_item"
                        selectedMinigameType={selectedMinigameType}
                        setSelectedMinigameType={setSelectedMinigameType}
                    />
                )}
                {isVending && (
                    <MinigameListEditorPanel
                        name={t("minigame.vendingDrawings") as string}
                        defaultCount={DEFAULT_VENDING_COUNT}
                        typePrefix="task-vending_drawnitem"
                        selectedMinigameType={selectedMinigameType}
                        setSelectedMinigameType={setSelectedMinigameType}
                        hideCount
                    />
                )}
                {isWeapons && (
                    <MinigameListEditorPanel
                        name={t("minigame.weaponAsteroids") as string}
                        defaultCount={DEFAULT_ASTEROID_COUNT}
                        typePrefix="task-weapons_asteroid"
                        selectedMinigameType={selectedMinigameType}
                        setSelectedMinigameType={setSelectedMinigameType}
                    />
                )}
                {isWeapons && (
                    <MinigameListEditorPanel
                        name={t("minigame.weaponBrokenAsteroids") as string}
                        defaultCount={DEFAULT_ASTEROID_COUNT}
                        typePrefix="task-weapons_broken"
                        selectedMinigameType={selectedMinigameType}
                        setSelectedMinigameType={setSelectedMinigameType}
                        hideCount
                    />
                )}
                {isFans && (
                    <MinigameListEditorPanel
                        name={t("minigame.fanSymbols") as string}
                        defaultCount={DEFAULT_FANS_COUNT}
                        typePrefix={element.type + "_symbol"}
                        selectedMinigameType={selectedMinigameType}
                        setSelectedMinigameType={setSelectedMinigameType}
                    />
                )}


            </PanelContainer>
            <MapError
                info
                icon="media"
            >
                {t("minigame.saveInfo")}
            </MapError>
        </>
    );
}
