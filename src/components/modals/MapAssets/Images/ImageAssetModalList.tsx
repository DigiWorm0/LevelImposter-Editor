import { Box, ImageList, Typography } from "@mui/material";
import ImageAssetModalButton from "./ImageAssetModalButton";
import React from "react";
import useMapAssetsValue from "../../../../hooks/assets/useMapAssets";
import GUID, { MaybeGUID } from "../../../../types/generic/GUID";
import MapAssetModalDropdown from "../MapAssetModalDropdown";

export interface ImageAssetModalListProps {
    onClick: (id: GUID) => void;
    selectedID: MaybeGUID;
}

export default function ImageAssetModalList(props: ImageAssetModalListProps) {
    const assets = useMapAssetsValue();

    const imageAssets = assets?.filter(asset => asset.type === "image");
    const hasImageAssets = imageAssets && imageAssets.length > 0;

    return (
        <MapAssetModalDropdown name={"Images"}>
            <ImageList
                cols={hasImageAssets ? 4 : 1}
                sx={{ m: 0 }}
            >
                {imageAssets?.map(asset => (
                    <ImageAssetModalButton
                        key={asset.id}
                        id={asset.id}
                        isActive={props.selectedID === asset.id}
                        onClick={() => props.onClick(asset.id)}
                    />
                )) ?? []}

                {!hasImageAssets && (
                    <Box sx={{ textAlign: "center", m: 2 }}>
                        <Typography
                            color={"text.secondary"}
                            variant={"body2"}
                        >
                            No images assets found.
                        </Typography>
                    </Box>
                )}
            </ImageList>
        </MapAssetModalDropdown>
    );
}