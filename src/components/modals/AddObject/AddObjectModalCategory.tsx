import { ListSubheader } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddObjectModalButton from "./AddObjectModalButton";
import React from "react";
import AUElementDB from "../../../types/db/AUElementDB";

export interface AddObjectModalCategoryProps {
    name: string;
    typeFilter: string;
    onClick: (type: string) => void;
}

export default function AddObjectModalCategory(props: AddObjectModalCategoryProps) {
    const filteredTypes = React.useMemo(() => (
        AUElementDB.filter(type => type.startsWith(props.typeFilter))
    ), [props.typeFilter]);

    return (
        <>
            <ListSubheader sx={{ backgroundColor: grey[900] }}>
                {props.name}
            </ListSubheader>
            {filteredTypes.map((type) => (
                <AddObjectModalButton
                    key={type}
                    type={type}
                    onClick={props.onClick}
                />
            ))}
        </>
    )
}