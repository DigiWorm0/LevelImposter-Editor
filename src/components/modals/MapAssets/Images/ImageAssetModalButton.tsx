import { Box, Button } from "@mui/material";
import React from "react";
import GUID from "../../../../types/generic/GUID";
import { useMapAssetValue } from "../../../../hooks/map/assets/useMapAsset";

export interface MapAssetModalButtonProps {
    id: GUID;
    isActive: boolean;
    onClick: () => void;
}

export default function ImageAssetModalButton(props: MapAssetModalButtonProps) {
    const asset = useMapAssetValue(props.id);

    if (!asset)
        return null;
    return (
        <Box
            sx={{ flex: 1 }}
        >
            <Button
                color={"inherit"}
                variant={props.isActive ? "contained" : undefined}
                onClick={props.onClick}
                sx={{
                    height: "100%",
                    width: "100%",
                    p: 1,
                    m: 0
                }}
            >
                <img
                    alt={asset.id}
                    src={asset.url}
                    style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                    }}
                />
            </Button>
        </Box>
    );
}