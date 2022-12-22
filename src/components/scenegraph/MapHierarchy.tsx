import React from "react";
import { EditableText, H3, InputGroup, Menu, MenuDivider } from "@blueprintjs/core";
import { useElementChildren } from "../../hooks/jotai/useElements";
import MapButtons from "../dialogs/MapButtons";
import MapHierarchyElement from "./MapHierarchyElement";
import RootHierarchyElement from "./RootHierarchyElement";
import { useTranslation } from "react-i18next";

export default function MapHierarchy() {
    const { t } = useTranslation();
    const elementIDs = useElementChildren(undefined);
    const [searchQuery, setSearchQuery] = React.useState<string>("");

    return (
        <>
            <InputGroup
                placeholder={t("edit.search") as string}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon="search"
                intent={searchQuery.length > 0 ? "warning" : "none"}
                small
                style={{
                    border: "none",
                    outline: 0,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                }}
            />
            <MenuDivider />
            <div style={{
                overflowY: "auto",
                height: "calc(100vh - 150px)",
                width: "100%",
                backgroundColor: "transparent",
            }}>
                <Menu
                    style={{
                        backgroundColor: "transparent"
                    }}>

                    {elementIDs.map((elemID) => (
                        <MapHierarchyElement
                            key={elemID}
                            elementID={elemID}
                            searchQuery={searchQuery}
                            isRoot={true}
                        />
                    ))}
                </Menu>
            </div>

            <MenuDivider />
            <MapButtons />
        </>
    );
}