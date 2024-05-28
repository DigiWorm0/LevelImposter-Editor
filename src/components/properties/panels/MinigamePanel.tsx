import React from "react";
import { useTranslation } from "react-i18next";
import AUMinigameDB from "../../../types/db/AUMinigameDB";
import { DoorType } from "../../../types/generic/DoorType";
import MinigameEditorPanel from "../editors/MinigameEditorPanel";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import MinigamePropSwitch from "../input/minigame/MinigamePropSwitch";
import MinigamePropTextInput from "../input/minigame/MinigamePropTextInput";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import MinigamePropColorInput from "../input/minigame/MinigamePropColorInput";
import { Code, PlayArrow, Warning } from "@mui/icons-material";

const POLUS_DOOR_MINIGAMES = [
    "sab-doorv_bg",
    "sab-doorv_switch",
    "sab-doorh_bg",
    "sab-doorh_switch"
];

export default function MinigamePanel() {
    const { t } = useTranslation();
    const selectedType = useSelectedElemType();
    const doorType = useSelectedElemPropValue("doorType") ?? DoorType.Skeld;
    const minigames = useSelectedElemPropValue("minigames") || [];
    const [selectedMinigameType, setSelectedMinigameType] = React.useState<string | undefined>(undefined);

    const minigameSprites = AUMinigameDB.filter((mg) => mg.split("_")[0] === selectedType);

    const isReactor = selectedType?.startsWith("sab-reactor");
    const isLights = selectedType === "sab-electric";
    const isFuel = selectedType?.startsWith("task-fuel");
    const isDoor = selectedType?.startsWith("sab-door");
    const isTelescope = selectedType === "task-telescope";
    const isWeapons = selectedType === "task-weapons";
    const isBoardingPass = selectedType === "task-pass";

    if (!selectedType || minigameSprites.length === 0)
        return null;

    return (
        <>
            <PanelContainer title={t("minigame.title") as string}>
                <DropdownList
                    elements={minigameSprites.map((type) => {
                        const hasSprite = minigames?.find((m) => m.type === type)?.spriteID !== undefined;
                        const isDisabled = isDoor && (
                            doorType === DoorType.Skeld ||
                            (doorType === DoorType.Polus && !POLUS_DOOR_MINIGAMES.includes(type)) ||
                            (doorType === DoorType.Airship && POLUS_DOOR_MINIGAMES.includes(type))
                        );

                        return {
                            id: type,
                            name: t(`minigame.${type.split("_")[1]}`, { index: type.split("_")[2] }) as string,
                            icon: (isDisabled && hasSprite) ? <Warning /> : <Code />,
                            intent: hasSprite ? 'success' : 'error',
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
                    <MinigamePropColorInput
                        name={t("minigame.reactorColorGood")}
                        prop={"reactorColorGood"}
                        defaultValue={{ r: 77, g: 226, b: 255, a: 255 }}
                    />
                )}
                {isReactor && (
                    <MinigamePropColorInput
                        name={t("minigame.reactorColorBad")}
                        prop={"reactorColorBad"}
                        defaultValue={{ r: 255, g: 41, b: 0, a: 255 }}
                    />
                )}
                {isLights && (
                    <MinigamePropColorInput
                        name={t("minigame.lightsColorOn")}
                        prop={"lightsColorOn"}
                        defaultValue={{ r: 0, g: 255, b: 0, a: 255 }}
                    />
                )}
                {isLights && (
                    <MinigamePropColorInput
                        name={t("minigame.lightsColorOff")}
                        prop={"lightsColorOff"}
                        defaultValue={{ r: 26, g: 77, b: 26, a: 255 }}
                    />
                )}
                {isFuel && (
                    <MinigamePropColorInput
                        name={t("minigame.fuelColor")}
                        prop={"fuelColor"}
                        defaultValue={{ r: 197, g: 170, b: 20, a: 255 }}
                    />
                )}
                {isFuel && (
                    <MinigamePropColorInput
                        name={t("minigame.bgColor")}
                        prop={"fuelBgColor"}
                        defaultValue={{ r: 0, g: 0, b: 0, a: 255 }}
                    />
                )}
                {isTelescope && (
                    <MinigamePropSwitch
                        name={t("minigame.starfieldEnabled")}
                        prop={"isStarfieldEnabled"}
                        defaultValue={true}
                    />
                )}
                {isWeapons && (
                    <MinigamePropColorInput
                        name={t("minigame.weaponsColor")}
                        prop={"weaponsColor"}
                        defaultValue={{ r: 22, g: 72, b: 46, a: 255 }}
                    />
                )}
                {isBoardingPass && (
                    <MinigamePropTextInput
                        name={t("minigame.qrCodeText")}
                        prop={"qrCodeText"}
                    />
                )}

            </PanelContainer>
            <MapError
                info
                icon={<PlayArrow />}
            >
                {t("minigame.saveInfo")}
            </MapError>
        </>
    );
}
