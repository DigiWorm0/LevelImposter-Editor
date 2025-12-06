import {MaybeGUID} from "../../types/common/GUID";
import React from "react";
import useMapAsset from "../../hooks/assets/useMapAsset";

export interface ImageAssetProps extends Partial<React.HTMLAttributes<HTMLImageElement>> {
    assetID: MaybeGUID;
}

export default function ImageAsset(props: ImageAssetProps) {
    const asset = useMapAsset(props.assetID);

    // TODO: Fix warning about `assetID` being passed to the DOM

    return (
        <img
            {...props}
            alt={props.assetID}
            src={asset?.url}
        />
    );
}