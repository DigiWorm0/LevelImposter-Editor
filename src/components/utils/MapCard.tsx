import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { THUMBNAIL_WIDTH } from "../../types/generic/Constants";
import LIMetadata from "../../types/li/LIMetadata";

export interface MapCardProps {
    map: LIMetadata;
}

export default function MapCard(props: MapCardProps) {
    const { map } = props;
    return (
        <Card
            elevation={3}
            sx={{
                maxWidth: THUMBNAIL_WIDTH,
            }}
        >
            <CardMedia
                component={"img"}
                src={map.thumbnailURL || "/DefaultThumbnail.png"}
                alt={map.name}
            />
            <CardContent>

                <Typography variant={"h6"}>
                    {map.name}
                </Typography>
                <Typography
                    variant={"body2"}
                    color={"textSecondary"}
                >
                    by {map.authorName}
                </Typography>
                <Typography
                    variant={"body2"}
                    color={"textPrimary"}
                    sx={{ mt: 1 }}
                >
                    {map.description.substring(0, 100) + "..."}
                </Typography>
            </CardContent>
        </Card>
    )
}