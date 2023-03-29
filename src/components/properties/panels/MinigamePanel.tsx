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

export default function MinigamePanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();
    const [selectedMinigameType, setSelectedMinigameType] = React.useState<string | undefined>(undefined);

    const minigameSprites = React.useMemo(() => AUMinigameDB.filter((mg) => mg.split("_")[0] === element?.type), [element]);
    const isReactor = React.useMemo(() => element?.type.startsWith("sab-reactor"), [element]);
    const isLights = React.useMemo(() => element?.type === "sab-electric", [element]);

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
