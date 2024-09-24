import {ListItem} from "@mui/material";
import {ListItemProps} from "@mui/material/ListItem/ListItem";

export default interface SceneGraphListItemProps extends ListItemProps {
    isGroup?: boolean;
}

const SUCCESS_BG = "#193d1d";
const SUCCESS_FG = "success.light";
const PRIMARY_BG = "#19333d";
const PRIMARY_FG = "primary.main";

export function SceneGraphListItem(props: SceneGraphListItemProps) {

    const listItemProps = {...props};
    delete listItemProps.isGroup;

    const foreground = props.isGroup ? PRIMARY_FG : SUCCESS_FG;
    const background = props.isGroup ? PRIMARY_BG : SUCCESS_BG;
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