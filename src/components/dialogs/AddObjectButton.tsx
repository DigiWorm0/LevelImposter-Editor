import { AnchorButton, Classes } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from '../../hooks/generateGUID';
import { useAddElementAtMouse } from "../../hooks/jotai/useElements";
import { useSetSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import { useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import AUElementDB from "../../types/au/AUElementDB";

interface AUElement {
    name: string;
    type: string;
}
const AUElementOmnibar = Omnibar.ofType<AUElement>();

export default function AddObjectButton(props: { isSidePanel?: boolean }) {
    const { t } = useTranslation();
    const addElement = useAddElementAtMouse();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();
    const [isOpen, setIsOpen] = React.useState(false);
    const settings = useSettingsValue();

    const handleClick = (elem: AUElement) => {
        const id = generateGUID();
        addElement({
            name: elem.name || t(`au.${elem.type}`) || elem.type,
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
                content={t("object.add") as string}
                position="bottom">

                <AnchorButton
                    fill
                    className={Classes.MINIMAL}
                    icon={"cube-add"}
                    intent={props.isSidePanel ? "success" : undefined}
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            <AUElementOmnibar
                inputProps={{
                    placeholder: t("object.search") || "Search..."
                }}
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                items={AUElementDB.map((elem) => {
                    return {
                        name: t(`au.${elem}`) as string,
                        type: elem
                    }
                })}
                onItemSelect={(elem) => { handleClick(elem) }}
                className={settings.isDarkMode === false ? "" : "bp4-dark"}
                itemRenderer={(elem, props) => {
                    return (
                        <MenuItem2
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
                        <MenuItem2
                            icon="add"
                            text={t("object.create", { name: query })}
                            label={"util-blank"}
                            active={isActive}
                            onClick={onClick} />
                    )
                }}
            />
        </>
    );
}