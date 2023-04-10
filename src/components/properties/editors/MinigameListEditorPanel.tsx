import { H6 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import NumericPanelInput from "../input/NumericPanelInput";
import DropdownList, { DropdownElement } from "../util/DropdownList";
import MinigameEditorPanel from "./MinigameEditorPanel";

export interface MinigameListEditorProps {
    name: string;
    defaultCount: number;
    typePrefix: string;

    hideCount?: boolean;

    selectedMinigameType?: string;
    setSelectedMinigameType: (type?: string) => void;
}

export default function MinigameListEditorPanel(props: MinigameListEditorProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const itemCount = selectedElem?.properties.minigameItemCount ?? props.defaultCount;

    // Create Dropdown Items
    const dropdownItems = React.useMemo(() => {
        const items: DropdownElement<string>[] = [];
        for (let i = 0; i < itemCount; i++) {
            const type = `${props.typePrefix}_${i}`;
            items.push({
                id: type,
                name: t("minigame.item", { index: i + 1 }),
                icon: 'code-block',
                intent: selectedElem?.properties.minigames?.find((m) => m.type === type)?.spriteData ? 'success' : 'danger'
            });
        }
        return items;
    }, [itemCount, props.typePrefix, selectedElem, t]);

    // Remove Unused Minigame Items
    React.useEffect(() => {
        if (!selectedElem)
            return;
        console.log("MinigameListEditorPanel useEffect")
        const elemMinigames = selectedElem.properties.minigames?.filter((m) => m.type.startsWith(props.typePrefix));
        const filterIDs = elemMinigames?.filter((m) => {
            const index = parseInt(m.type.split("_")[2]);
            return index >= itemCount;
        }).map((m) => m.id) ?? [];
        const newElemMinigames = selectedElem?.properties.minigames?.filter((m) => !filterIDs?.includes(m.id));

        // Prevent infinite loop
        if (filterIDs?.length > 0) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    minigames: newElemMinigames
                }
            });
        }
    }, [itemCount, props.typePrefix, selectedElem, setSelectedElem]);

    if (!selectedElem)
        return null;

    return (
        <>
            {!props.hideCount && (
                <NumericPanelInput
                    name={t("minigame.itemCount") as string}
                    label={t("minigame.items") as string}
                    icon="array"
                    prop={"minigameItemCount"}
                    defaultValue={props.defaultCount}
                    min={1}
                    stepSize={1}
                    majorStepSize={5}
                />
            )}
            <H6>
                {props.name}
            </H6>
            <DropdownList
                elements={dropdownItems}
                onSelectID={props.setSelectedMinigameType}
                selectedID={props.selectedMinigameType}
                renderElement={(item) => (
                    <MinigameEditorPanel
                        key={item.id}
                        minigameType={item.id}
                        onFinish={() => props.setSelectedMinigameType("")}
                        hideName
                    />
                )}
            />
        </>
    )
}