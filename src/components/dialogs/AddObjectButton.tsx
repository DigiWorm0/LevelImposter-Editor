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
        map.elementIDs.push(element.id);
        setElement(element);
        setMap(map);
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
                            active={props.modifiers.active}
                            disabled={props.modifiers.disabled}
                            onClick={() => { handleClick(elem) }}
                            onFocus={props.handleFocus} />
                    )
                }}
                noResults={<MenuItem disabled text="No results." />}
                onQueryChange={(query) => { setSerchTerm(query) }}
                query={searchTerm}
            />
        </>
    );
}