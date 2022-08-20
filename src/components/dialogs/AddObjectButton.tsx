import { Button, Classes, MenuItem } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
import generateGUID from '../../hooks/generateGUID';
import { useAddElementAtMouse } from "../../hooks/jotai/useElement";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSetSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import { useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";

const AUElementOmnibar = Omnibar.ofType<AUElement>();

export default function AddObjectButton(props: { isSidePanel?: boolean }) {
    const addElement = useAddElementAtMouse();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();
    const [isOpen, setIsOpen] = React.useState(false);
    const saveHistory = useSaveHistory();
    const settings = useSettingsValue();

    const handleClick = (elem: AUElement) => {
        const id = generateGUID();
        saveHistory();
        addElement({
            name: elem.name,
            type: elem.type,
            id,
            x: 0,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        });
        setIsOpen(false);
        setSelectedID(id);
        setColliderID(undefined);
    }

    return (
        <>
            <Tooltip2
                fill
                content="Add an object"
                position="bottom">

                <Button
                    fill
                    large={props.isSidePanel}
                    className={Classes.MINIMAL}
                    icon={props.isSidePanel ? "plus" : "cube-add"}
                    text={props.isSidePanel ? "Add Object" : undefined}
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            <AUElementOmnibar
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                items={AUElementDB}
                onItemSelect={(elem) => { handleClick(elem) }}
                className={settings.isDarkMode === false ? "" : "bp4-dark"}
                itemRenderer={(elem, props) => {
                    return (
                        <MenuItem
                            key={elem.type}
                            text={elem.name}
                            label={elem.type}
                            icon={<div style={{ width: 20, textAlign: "center" }}><img src={"/sprites/" + elem.type + ".png"} style={{ maxWidth: 20, maxHeight: 20 }} /></div>}
                            active={props.modifiers.active}
                            disabled={props.modifiers.disabled}
                            onClick={props.handleClick}
                            onFocus={props.handleFocus} />
                    )
                }}
                itemPredicate={(query, elem) => {
                    return elem.name.toLowerCase().includes(query.toLowerCase()) ||
                        elem.type.toLowerCase().includes(query.toLowerCase());
                }}
                initialContent={undefined}
                createNewItemPosition="first"
                createNewItemFromQuery={(query) => {
                    return {
                        name: query,
                        type: "util-blank"
                    }
                }}
                createNewItemRenderer={(query, isActive, onClick) => {
                    return (
                        <MenuItem
                            icon="add"
                            text={"Create '" + query + "'"}
                            label={"util-blank"}
                            active={isActive}
                            onClick={onClick} />
                    )
                }}
            />
        </>
    );
}