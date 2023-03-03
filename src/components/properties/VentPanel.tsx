import React from "react";
import { Button, ControlGroup, H6, Icon, Menu, MenuDivider } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";
import { useSelectedSoundID } from "../../hooks/jotai/useSelectedSound";
import SoundEditorPanel from "./SoundEditorPanel";
import LISound from "../../types/li/LISound";
import generateGUID from "../../hooks/generateGUID";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import MapError from "./MapError";

const VentSelect = Select2.ofType<LIElement>();
const VENT_OPEN_SOUND = "ventOpen";
const VENT_MOVE_SOUND = "ventMove";

export default function VentPanel() {
    const { t } = useTranslation();
    const ventElemsA = useElementType("util-vent1");
    const ventElemsB = useElementType("util-vent2");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();

    const ventElems = React.useMemo(() => ventElemsA.concat(ventElemsB), [ventElemsA, ventElemsB]);

    const leftVent = React.useMemo(() => ventElems.find((e) => e.id === selectedElem?.properties.leftVent), [selectedElem, ventElems]);
    const middleVent = React.useMemo(() => ventElems.find((e) => e.id === selectedElem?.properties.middleVent), [selectedElem, ventElems]);
    const rightVent = React.useMemo(() => ventElems.find((e) => e.id === selectedElem?.properties.rightVent), [selectedElem, ventElems]);
    const filteredVents = React.useMemo(
        () => {
            return ventElems.filter((elem) =>
                elem.id !== selectedElem?.id &&
                leftVent?.id !== elem.id &&
                middleVent?.id !== elem.id &&
                rightVent?.id !== elem.id);
        },
        [leftVent, middleVent, rightVent, selectedElem, ventElems]);

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);
    const selectedSoundType = React.useMemo(() => sounds.find((s) => s.id === selectedSoundID)?.type, [selectedSoundID, sounds]);
    const hasOpenSound = React.useMemo(() => sounds.some((s) => s.type === VENT_OPEN_SOUND), [sounds]);
    const hasMoveSound = React.useMemo(() => sounds.some((s) => s.type === VENT_MOVE_SOUND), [sounds]);

    const editSound = React.useCallback((soundName: string) => {
        if (!selectedElem)
            return;

        const soundID = sounds.find((s) => s.type === soundName)?.id;
        if (soundID === selectedSoundID && soundID)
            setSelectedSoundID(undefined);
        else if (soundID)
            setSelectedSoundID(soundID);
        else {
            const newSound: LISound = {
                id: generateGUID(),
                type: soundName,
                data: undefined,
                volume: DEFAULT_VOLUME,
                isPreset: false
            };
            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, sounds: [...sounds, newSound] } });
            setSelectedSoundID(newSound.id);
        }
    }, [selectedElem, selectedSoundID, setSelectedElem, setSelectedSoundID, sounds]);

    const ventSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const hasVents = filteredVents.length >= 1;

    if (!selectedElem
        || !selectedElem.type.startsWith("util-vent"))
        return null;

    return (
        <>
            <PanelContainer title={t("vent.title") as string}>
                <ControlGroup fill>
                    <VentSelect
                        fill
                        filterable={false}
                        disabled={!hasVents}
                        items={filteredVents}
                        itemRenderer={ventSelectRenderer}
                        onItemSelect={(vent) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, leftVent: vent.id } });
                        }}>

                        <Button
                            minimal
                            rightIcon="caret-down"
                            text={leftVent ? leftVent.name : t("vent.noConnection") as string}
                            fill
                        />
                    </VentSelect>
                    <Button
                        minimal
                        rightIcon="refresh"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, leftVent: undefined } });
                        }}
                    />
                </ControlGroup>

                <ControlGroup fill>
                    <VentSelect
                        fill
                        filterable={false}
                        disabled={!hasVents}
                        items={filteredVents}
                        itemRenderer={ventSelectRenderer}
                        onItemSelect={(vent) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, middleVent: vent.id } });
                        }}>

                        <Button
                            minimal
                            rightIcon="caret-down"
                            text={middleVent ? middleVent.name : t("vent.noConnection") as string}
                            fill
                        />
                    </VentSelect>
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, middleVent: undefined } });
                        }}
                    />
                </ControlGroup>

                <ControlGroup fill>
                    <VentSelect
                        fill
                        filterable={false}
                        disabled={!hasVents}
                        items={filteredVents}
                        itemRenderer={ventSelectRenderer}
                        onItemSelect={(vent) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, rightVent: vent.id } });
                        }}>

                        <Button
                            minimal
                            rightIcon="caret-down"
                            text={rightVent ? rightVent.name : t("vent.noConnection") as string}
                            fill
                        />
                    </VentSelect>
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, rightVent: undefined } });
                        }}
                    />
                </ControlGroup>
                {selectedElem.type === "util-vent1" && (
                    <Menu>
                        <MenuDivider />
                        <div>
                            <MenuItem2
                                icon="volume-up"
                                onClick={() => editSound(VENT_OPEN_SOUND)}
                                active={selectedSoundType === VENT_OPEN_SOUND}
                                text={t(`vent.${VENT_OPEN_SOUND}`) as string}
                                intent={hasOpenSound ? "success" : "danger"}
                                labelElement={
                                    <Tooltip2
                                        intent={hasOpenSound ? "success" : "danger"}
                                        content={t("vent.globalInfo") as string}>
                                        <Icon icon="globe-network" />
                                    </Tooltip2>
                                }
                            />

                            {selectedSoundType === VENT_OPEN_SOUND && (
                                <SoundEditorPanel
                                    title={t(`vent.${VENT_OPEN_SOUND}`) as string}
                                />
                            )}
                        </div>
                        <div>
                            <MenuItem2
                                icon="volume-up"
                                onClick={() => editSound(VENT_MOVE_SOUND)}
                                active={selectedSoundType === VENT_MOVE_SOUND}
                                text={t(`vent.${VENT_MOVE_SOUND}`) as string}
                                intent={hasMoveSound ? "success" : "danger"}
                                labelElement={
                                    <Tooltip2
                                        intent={hasMoveSound ? "success" : "danger"}
                                        content={t("vent.globalInfo") as string}>
                                        <Icon icon="globe-network" />
                                    </Tooltip2>
                                }
                            />

                            {selectedSoundType === VENT_MOVE_SOUND && (
                                <SoundEditorPanel
                                    title={t(`vent.${VENT_MOVE_SOUND}`) as string}
                                />
                            )}
                        </div>
                    </Menu>
                )}
            </PanelContainer>
            <MapError isVisible={selectedElem.type === "util-vent2"} info icon="volume-up">
                {t("vent.ventSoundInfo")}
            </MapError>
        </>
    );
}
