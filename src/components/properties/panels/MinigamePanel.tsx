import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import AUMinigameDB from "../../../types/au/AUMinigameDB";
import MinigameEditorPanel from "../editors/MinigameEditorPanel";
import ColorPanelInput from "../input/ColorPanelInput";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import { DoorType } from "../../../types/generic/DoorType";
import SwitchPanelInput from "../input/SwitchPanelInput";
import TextPanelInput from "../input/TextPanelInput";

const POLUS_DOOR_MINIGAMES = [
    "sab-doorv_bg",
    "sab-doorv_switch",
    "sab-doorh_bg",
    "sab-doorh_switch"
];

export default function MinigamePanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();
    const [selectedMinigameType, setSelectedMinigameType] = React.useState<string | undefined>(undefined);

    const minigameSprites = React.useMemo(() => AUMinigameDB.filter((mg) => mg.split("_")[0] === element?.type), [element]);

    const isReactor = React.useMemo(() => element?.type.startsWith("sab-reactor"), [element]);
    const isLights = React.useMemo(() => element?.type === "sab-electric", [element]);
    const isFuel = React.useMemo(() => element?.type.startsWith("task-fuel"), [element]);
    const isDoor = React.useMemo(() => element?.type.startsWith("sab-door"), [element]);
    const isTelescope = React.useMemo(() => element?.type === "task-telescope", [element]);
    const isWeapons = React.useMemo(() => element?.type === "task-weapons", [element]);
    const isBoardingPass = React.useMemo(() => element?.type === "task-pass", [element]);
    const doorType = React.useMemo(() => element?.properties.doorType ?? DoorType.Skeld, [element]);

    if (!element || minigameSprites.length === 0)
        return null;

    return (
        <>
            <PanelContainer title={t("minigame.title") as string}>
                <DropdownList
                    elements={minigameSprites.map((type) => {
                        const hasSprite = element.properties.minigames?.find((m) => m.type === type)?.spriteData !== undefined;
                        const isDisabled = isDoor && (
                            doorType === DoorType.Skeld ||
                            (doorType === DoorType.Polus && !POLUS_DOOR_MINIGAMES.includes(type)) ||
                            (doorType === DoorType.Airship && POLUS_DOOR_MINIGAMES.includes(type))
                        );

                        return {
                            id: type,
                            name: t(`minigame.${type.split("_")[1]}`, { index: type.split("_")[2] }) as string,
                            icon: (isDisabled && hasSprite) ? 'warning-sign' : 'code-block',
                            intent: hasSprite ? 'success' : 'danger',
                            isDisabled: isDisabled
                        };
                    })}
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
                {isFuel && (
                    <ColorPanelInput
                        name={t("minigame.fuelColor") as string}
                        minigameProp={"fuelColor"}
                        defaultValue={{ r: 197, g: 170, b: 20, a: 255 }}
                    />
                )}
                {isFuel && (
                    <ColorPanelInput
                        name={t("minigame.bgColor") as string}
                        minigameProp={"fuelBgColor"}
                        defaultValue={{ r: 0, g: 0, b: 0, a: 255 }}
                    />
                )}
                {isTelescope && (
                    <SwitchPanelInput
                        name={"minigame.starfieldEnabled"}
                        minigameProp={"isStarfieldEnabled"}
                        defaultValue={true}
                    />
                )}
                {isWeapons && (
                    <ColorPanelInput
                        name={t("minigame.weaponsColor") as string}
                        minigameProp={"weaponsColor"}
                        defaultValue={{ r: 22, g: 72, b: 46, a: 255 }}
                    />
                )}
                {isBoardingPass && (
                    <TextPanelInput
                        name={"minigame.qrCodeText"}
                        minigameProp={"qrCodeText"}
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
