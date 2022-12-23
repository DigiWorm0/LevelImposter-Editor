import { AnchorButton, Button, ControlGroup, FormGroup, Icon } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import DoorType from "../../types/generic/DoorType";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";

const TypeSelect = Select2.ofType<string>();

export default function DoorPanel() {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    const typeSelectRenderer: ItemRenderer<string> = (type, props) => (
        <MenuItem2
            key={props.index + "-type"}
            text={t(`door.${type}`) as string}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem
        || !selectedElem.type.startsWith("sab-door"))
        return null;

    return (
        <>
            <PanelContainer title={t("door.title") as string}>
                <FormGroup>
                    <RoomSelect useDefault={true} />

                    <ControlGroup fill>
                        <TypeSelect
                            fill
                            filterable={false}
                            items={DoorType}
                            itemRenderer={typeSelectRenderer}
                            onItemSelect={(length) => {
                                setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, doorType: length } });
                            }}>

                            <Button
                                rightIcon="caret-down"
                                text={t(`door.${selectedElem.properties.doorType || "skeld"}`) as string}
                                fill
                            />
                        </TypeSelect>
                        <Tooltip2
                            intent="primary"
                            content={t("door.globalInfo") as string}>
                            <AnchorButton
                                minimal
                                rightIcon="globe-network"
                                intent="primary"
                            />
                        </Tooltip2>
                    </ControlGroup>
                </FormGroup>
            </PanelContainer>
            <MapError isVisible={parentRoom === undefined}>
                {t("door.errorNoRoom")}
            </MapError>
        </>
    );
}
