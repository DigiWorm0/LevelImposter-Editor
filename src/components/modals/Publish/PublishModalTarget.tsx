import {
    Box,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import React from "react";
import { Add, SwapVert } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useUserMaps from "../../../hooks/firebase/useUserMaps";
import usePublishTarget from "../../../hooks/firebase/publish/usePublishTarget";

export default function PublishModalTarget() {
    const { t } = useTranslation();
    const [targetID, setTargetID] = usePublishTarget();
    const maps = useUserMaps();

    // Revert non-existant map ID
    React.useEffect(() => {
        if (!maps?.some(map => map.id === targetID))
            setTargetID(null);
    }, [maps, targetID]);

    return (
        <Box>
            <List dense>
                <ListItem
                    disablePadding
                >
                    <ListItemButton
                        selected={targetID === null}
                        onClick={() => setTargetID(null)}
                    >
                        <ListItemIcon>
                            <Add />
                        </ListItemIcon>
                        <ListItemText
                            primary={"New"}
                            secondary={"Publish as a new map"}
                        />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ m: 1 }} />

                <Box
                    sx={{
                        maxHeight: 300,
                        overflow: "auto"
                    }}
                >
                    {maps?.map(map => (
                        <ListItem
                            key={map.id}
                            disablePadding
                        >
                            <ListItemButton
                                onClick={() => setTargetID(map.id)}
                                selected={targetID === map.id}
                            >
                                <ListItemIcon>
                                    <SwapVert />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ ms: 2 }}
                                    primary={map.name}
                                    secondary={map.description.substring(0, 100) + "..."}
                                />
                                {!map.isPublic && (
                                    <Chip color="error" label={t("map.unlisted")} size={"small"} />
                                )}
                                {map.isVerified && (
                                    <Chip color="warning" label={t("map.verified")} size={"small"} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    {maps === undefined && (
                        <CircularProgress
                            sx={{ m: 1 }}
                            color={"inherit"}
                        />
                    )}
                    {maps?.length === 0 && (
                        <Typography
                            sx={{ p: 2 }}
                            variant={"body2"}
                            color={"text.secondary"}
                        >
                            No maps published yet
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ m: 1 }} />
            </List>
        </Box>
    );
}