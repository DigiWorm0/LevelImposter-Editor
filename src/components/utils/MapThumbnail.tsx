import LIMetadata from "../../types/li/LIMetadata";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Tag, Tooltip } from "@blueprintjs/core";

export interface MapThumbnailProps {
    map: LIMetadata;
}

const MAX_DESCRIPTION_LENGTH = 300;

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

    return (
        <Card style={{ marginTop: 5 }} key={map.id}>
            <div
                style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    {!map.isPublic && (
                        <Tag
                            intent="danger">
                            {t("map.unlisted")}
                        </Tag>
                    )}
                    {map.isVerified && (
                        <Tag
                            intent="warning">
                            {t("map.verified")}
                        </Tag>
                    )}
                </div>
                <Tooltip
                    content={t("map.viewExternal") as string}
                    position="top-left"
                >
                    <Button
                        small
                        minimal
                        icon={"share"}
                        onClick={() => {
                            window.open(`https://levelimposter.net/#/map/${map.id}`);
                        }}
                    />
                </Tooltip>
            </div>
            <h3 style={{ marginTop: 5, marginBottom: 10 }}>
                {map.name}
            </h3>
            <p>
                {shortDescription}
            </p>
        </Card>
    );
}