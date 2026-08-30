import {MaybeGUID} from "@/shared/types/GUID";
import React from "react";
import useAsset from "../../hooks/assets/useAsset";

export interface ImageAssetProps extends Partial<React.HTMLAttributes<HTMLImageElement>> {
    assetID: MaybeGUID;
}

export default function ImageAsset(props: ImageAssetProps) {
    const asset = useAsset(props.assetID);

    // TODO: Fix warning about `assetID` being passed to the DOM

    return (
        <img
            {...props}
            alt={props.assetID}
            src={asset?.url}
        />
    );
}