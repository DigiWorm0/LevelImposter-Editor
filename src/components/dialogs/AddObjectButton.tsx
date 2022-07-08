import { setElement } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import generateGUID from '../../hooks/generateGUID';
import { Button, Classes, Dialog, InputGroup, Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import React from "react";

const AUElementOmnibar = Omnibar.ofType<AUElement>();

export default function AddObjectButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [filteredElements, setFilteredElements] = React.useState<AUElement[]>([]);
    const [searchTerm, setSerchTerm] = React.useState("");
    const [map, setMap] = useMap();

    React.useEffect(() => {
        const filtered = AUElementDB.filter(e => {
            return e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.type.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredElements(filtered);
    }, [searchTerm, setFilteredElements])

    const handleClick = (elem: AUElement) => {
        const element: LIElement = {
            name: elem.name,
            type: elem.type,
            id: generateGUID(),
            x: 1,
            y: 1,
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
            <Button
                className={Classes.MINIMAL}
                icon="plus"
                text="Add Object"
                onClick={() => { setIsOpen(true) }} />

            <AUElementOmnibar
                resetOnSelect
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                items={filteredElements}
                onItemSelect={(elem) => { handleClick(elem) }}
                itemRenderer={(elem, props) => {
                    return (
                        <MenuItem
                            key={elem.type + props.index}
                            text={elem.name}
                            label={elem.type}
                            icon={<div style={{ width: 20, textAlign: "center" }}><img src={"/sprites/" + elem.type + ".png"} style={{ maxWidth: 20, maxHeight: 20 }} /></div>}
                            active={props.modifiers.active}
                            disabled={props.modifiers.disabled}
                            onClick={props.handleClick}
                            onFocus={props.handleFocus} />
                    )
                }}
                onQueryChange={(query) => { setSerchTerm(query) }}
                query={searchTerm}
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