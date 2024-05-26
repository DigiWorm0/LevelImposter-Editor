import { useTranslation } from "react-i18next";
import { DEFAULT_GUID } from "../../utils/generateGUID";
import { useMapValue } from "../../hooks/map/useMap";
import useEmbed from "../../hooks/embed/useEmbed";
import { Button, Tooltip } from "@mui/material";
import { Launch } from "@mui/icons-material";
import React from "react";

export default function OpenInEditor() {
    const map = useMapValue();
    const isEmbed = useEmbed();
    const { t } = useTranslation();

    const url = React.useMemo(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("embed");
        url.searchParams.set("id", map.id);
        return url.toString();
    }, [map.id]);

    if (!isEmbed || map.id === DEFAULT_GUID)
        return null;

    const canRemix = map.properties.canRemix !== false;

    return (
        <div
            style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1
            }}
        >

            <Tooltip
                title={!canRemix ? t("map.errorRemix") : undefined}
            >
                <span>
                    <Button
                        size={"large"}
                        variant={"contained"}
                        color={"inherit"}
                        onClick={() => window.open(url, "_blank")}
                        endIcon={<Launch />}
                        disabled={!canRemix}
                    >
                        {t("embed.openInEditor")}
                    </Button>
                </span>
            </Tooltip>
        </div>
    );
}