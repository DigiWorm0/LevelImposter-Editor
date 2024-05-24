import { MaybeGUID } from "../../types/generic/GUID";
import React from "react";
import { useMapAssetValue } from "../../hooks/map/assets/useMapAsset";

export interface ImageAssetProps extends Partial<React.HTMLAttributes<HTMLImageElement>> {
    assetID: MaybeGUID;
}

export default function ImageAsset(props: ImageAssetProps) {
    const asset = useMapAssetValue(props.assetID);

    return (
        <img
            {...props}
            alt={props.assetID}
            src={asset?.url}

            assetID={undefined} {/* Prevents the assetID from being passed to the img element */}
        />
    )
}