import React from "react";
import { useTranslation } from "react-i18next";
import { useElementChildren } from "../../hooks/map/elements/useElements";
import MapHierarchyButtons from "../buttons/MapHierarchyButtons";
import MapHierarchyElement from "./MapHierarchyElement";
import { Divider, TextField } from "@mui/material";

export default function MapHierarchy() {
    const { t } = useTranslation();
    const elementIDs = useElementChildren(undefined);
    const [searchQuery, setSearchQuery] = React.useState<string>("");

    return (
        <>
            <div style={{ padding: 10 }}>
                <TextField
                    placeholder={t("edit.search")}
                    variant={"standard"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        border: "none",
                        outline: 0,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    }}
                />
            </div>
            <div
                style={{
                    overflowY: "auto",
                    height: "calc(100vh - 150px)",
                    width: "100%",
                    backgroundColor: "transparent",
                }}
            >
                {elementIDs.map((elemID) => (
                    <MapHierarchyElement
                        key={elemID}
                        elementID={elemID}
                        searchQuery={searchQuery}
                        isRoot={true}
                    />
                ))}
            </div>
            <Divider />
            <MapHierarchyButtons />
        </>
    );
}