import LIMetadata from "../../types/li/LIMetadata";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardActionArea, CardContent, Chip } from "@mui/material";

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

    const onClick = React.useCallback(() => {
        window.open(`https://levelimposter.net/#/map/${map.id}`);
    }, [map.id]);

    return (
        <Card
            style={{ marginTop: 5, textAlign: "left" }}
            onClick={onClick}
            elevation={3}
        >
            <CardActionArea>
                <CardContent>
                    <div
                        style={{
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
                    </div>
                    <h3 style={{ marginTop: 5, marginBottom: 10 }}>
                        {map.name}
                    </h3>
                    <p>
                        {shortDescription}
                    </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}