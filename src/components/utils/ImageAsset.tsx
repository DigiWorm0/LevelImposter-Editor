import { MaybeGUID } from "../../types/generic/GUID";
import React from "react";
import { useMapAssetValue } from "../../hooks/assets/useMapAsset";

export interface ImageAssetProps extends Partial<React.HTMLAttributes<HTMLImageElement>> {
    assetID: MaybeGUID;
}

export default function ImageAsset(props: ImageAssetProps) {
    const asset = useMapAssetValue(props.assetID);

    // TODO: Fix warning about `assetID` being passed to the DOM

    return (
        <img
            {...props}
            alt={props.assetID}
            src={asset?.url}
        />
    );
}