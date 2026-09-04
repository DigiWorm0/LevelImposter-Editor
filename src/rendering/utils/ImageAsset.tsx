import {MaybeGUID} from "@/shared/types/GUID";
import React from "react";
import {assetsAtomFamily} from "@editor/assets/assetsStore";
import {useAtomValue} from "jotai";

export interface ImageAssetProps extends Partial<React.HTMLAttributes<HTMLImageElement>> {
    assetID: MaybeGUID;
}

export default function ImageAsset(props: ImageAssetProps) {
    const asset = useAtomValue(assetsAtomFamily(props.assetID));

    // TODO: Fix warning about `assetID` being passed to the DOM

    return (
        <img
            {...props}
            alt={props.assetID}
            src={asset?.url}
        />
    );
}