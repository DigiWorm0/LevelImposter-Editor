import {ListItem} from "@mui/material";
import {ListItemProps} from "@mui/material/ListItem/ListItem";

export default interface SceneGraphListItemProps extends ListItemProps {
    intent?: "primary" | "secondary" | "success";
}

const SUCCESS_BG = "#193d1d";
const SUCCESS_FG = "success.light";
const PRIMARY_BG = "#19333d";
const PRIMARY_FG = "primary.main";
const SECONDARY_BG = "#33233b";
const SECONDARY_FG = "secondary.main";

export function SceneGraphListItem(props: SceneGraphListItemProps) {

    const listItemProps = {...props};
    delete listItemProps.intent;

    const foreground = props.intent === "secondary" ? SECONDARY_FG :
        props.intent === "success" ? SUCCESS_FG :
            PRIMARY_FG;
    const background = props.intent === "secondary" ? SECONDARY_BG :
        props.intent === "success" ? SUCCESS_BG :
            PRIMARY_BG;

    return (
        <ListItem
            {...listItemProps}
            sx={{
                // Selected
                "&& .Mui-selected, && .Mui-selected:hover": {
                    bgcolor: background
                },
                // Hover
                "& .MuiListItemButton-root:hover": {
                    bgcolor: background
                },
                // Text
                color: foreground,
                // Left Icon
                "& .MuiListItemIcon-root": {
                    color: foreground
                },
                // Second Icon
                "& .MuiIconButton-root": {
                    color: foreground
                },
            }}
        >
            {props.children}
        </ListItem>
    );
}