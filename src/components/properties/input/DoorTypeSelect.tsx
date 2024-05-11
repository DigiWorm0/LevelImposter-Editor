import { AnchorButton, Button, ControlGroup, FormGroup } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { DoorType } from "../../../types/generic/DoorType";

export default function DoorTypeSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const selectRenderer: ItemRenderer<string> = (type, props) => (
        <MenuItem2
            key={props.index + "-type"}
            text={t(`door.${type}`) as string}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem)
        return null;

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <ControlGroup fill>
                <Select2
                    fill
                    filterable={false}
                    items={Object.values(DoorType)}
                    itemRenderer={selectRenderer}
                    onItemSelect={(length) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, doorType: length } });
                    }}
                >
                    <Button
                        rightIcon="caret-down"
                        text={t(`door.${selectedElem.properties.doorType ?? "skeld"}`) as string}
                        fill
                    />
                </Select2>
                <Tooltip2
                    intent="primary"
                    content={t("door.globalInfo") as string}
                >
                    <AnchorButton
                        minimal
                        rightIcon="globe-network"
                        intent="primary"
                        style={{
                            cursor: "help",
                        }}
                    />
                </Tooltip2>
            </ControlGroup>
        </FormGroup>
    )
}