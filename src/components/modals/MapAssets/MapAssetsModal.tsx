import React from "react";
import GenericModal from "../GenericModal";
import {Box} from "@mui/material";
import ImageAssetModalList from "./Images/ImageAssetModalList";
import {MaybeGUID} from "@/types/common/GUID";
import MapAssetModalEditor from "./MapAssetModalEditor";
import SoundAssetModalList from "./Sounds/SoundAssetModalList";

interface MapAssetsDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export default function MapAssetsModal(props: MapAssetsDialogProps) {
    const [selectedAssetID, setSelectedAssetID] = React.useState<MaybeGUID>(undefined);

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={"Map Assets"}
            DialogProps={{maxWidth: "md"}}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
            >
                <Box sx={{flex: 1}}>
                    <ImageAssetModalList
                        selectedID={selectedAssetID}
                        onClick={setSelectedAssetID}
                    />
                    <SoundAssetModalList
                        selectedID={selectedAssetID}
                        onClick={setSelectedAssetID}
                    />
                </Box>
                <MapAssetModalEditor
                    id={selectedAssetID}
                    onClose={() => setSelectedAssetID(undefined)}
                />
            </Box>
        </GenericModal>
    );
}