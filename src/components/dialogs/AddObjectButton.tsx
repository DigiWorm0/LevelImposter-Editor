import { Button, Classes, MenuItem } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
import generateGUID from '../../hooks/generateGUID';
import { setElement } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";

const AUElementOmnibar = Omnibar.ofType<AUElement>();

export default function AddObjectButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [map, setMap] = useMap();

    const handleClick = (elem: AUElement) => {
        const element: LIElement = {
            name: elem.name,
            type: elem.type,
            id: generateGUID(),
            x: 0,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        };
        const elementIDs = [...map.elementIDs, element.id];
        setMap({ ...map, elementIDs });
        setElement(element);
        setIsOpen(false);
    }

    return (
        <>
            <Tooltip2
                content="Add an object"
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="cube-add"
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            <AUElementOmnibar
                resetOnSelect
                resetOnQuery
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                items={AUElementDB}
                onItemSelect={(elem) => { handleClick(elem) }}
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