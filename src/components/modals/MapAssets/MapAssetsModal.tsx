import React from "react";
import GenericModal from "../GenericModal";
import { Box, ButtonGroup } from "@mui/material";
import ImageAssetModalList from "./Images/ImageAssetModalList";
import { MaybeGUID } from "../../../types/generic/GUID";
import MapAssetModalEditor from "./MapAssetModalEditor";
import SoundAssetModalList from "./Sounds/SoundAssetModalList";
import MergeAssetsButton from "../../buttons/MergeAssetsButton";
import TrimAssetsButton from "../../buttons/TrimAssetsButton";

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
            DialogProps={{ maxWidth: "md" }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ p: 1 }}>
                        <ButtonGroup fullWidth>
                            <MergeAssetsButton />
                            <TrimAssetsButton />
                        </ButtonGroup>
                    </Box>
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