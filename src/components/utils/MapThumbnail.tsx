import LIMetadata from "../../types/li/LIMetadata";
import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { Edit, OpenInNew } from "@mui/icons-material";

export interface MapThumbnailProps {
    map: LIMetadata;
}

const MAX_DESCRIPTION_LENGTH = 150;

export default function MapThumbnail(props: MapThumbnailProps) {
    const { t } = useTranslation();
    const { map } = props;

    const shortDescription = React.useMemo(() => {
        if (map.description.length <= 0)
            return t("map.noDescription") as string;
        if (map.description.length <= MAX_DESCRIPTION_LENGTH)
            return map.description;
        return map.description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
    }, [map.description, t]);

    const onOpen = React.useCallback(() => {
        window.open(`https://levelimposter.net/#/map/${map.id}`);
    }, [map.id]);

    const onEdit = React.useCallback(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("id", map.id);
        window.location.href = url.toString();
    }, [map.id]);

    return (
        <Card
            style={{ marginTop: 5, textAlign: "left" }}
            elevation={3}
        >
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Box
                            sx={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {!map.isPublic && (
                                <Chip color="error" label={t("map.unlisted")} size={"small"} />
                            )}
                            {map.isVerified && (
                                <Chip color="warning" label={t("map.verified")} size={"small"} />
                            )}
                        </Box>
                        <h3 style={{ marginTop: 5, marginBottom: 10 }}>
                            {map.name}
                        </h3>
                    </Box>
                    <Box>
                        <IconButton onClick={onEdit}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={onOpen}>
                            <OpenInNew />
                        </IconButton>
                    </Box>
                </Box>
                <Typography
                    variant={"body2"}
                >
                    {shortDescription}
                </Typography>
            </CardContent>
        </Card>
    );
}