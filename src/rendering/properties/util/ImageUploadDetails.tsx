import {Box} from "@mui/material";
import {MaybeGUID} from "@/shared/types/GUID";
import ImageUploadDetailsRow from "./ImageUploadDetailsRow";
import useSprite from "../../canvas2/hooks/texture/useSprite";
import dataSizeToString from "@shared/utils/dataSizeToString";
import {useAtomValue} from "jotai";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

export interface ImageUploadDetailsProps {
    assetID: MaybeGUID;
}

export default function ImageUploadDetails(props: ImageUploadDetailsProps) {
    const asset = useAtomValue(assetsAtomFamily(props.assetID));
    const sprite = useSprite(props.assetID);

    if (!asset || !sprite)
        return null;
    return (
        <Box
            sx={{
                color: "text.secondary",
                fontSize: 14,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box sx={{width: 150}}>
                <ImageUploadDetailsRow
                    label="Size"
                    value={`${sprite.width} x ${sprite.height}`}
                />
                <ImageUploadDetailsRow
                    label="Type"
                    value={asset.type}
                />
                <ImageUploadDetailsRow
                    label="File Size"
                    value={dataSizeToString(asset.blob.size)}
                />
            </Box>
        </Box>
    );
}