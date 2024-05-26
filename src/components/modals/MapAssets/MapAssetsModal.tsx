import React from "react";
import GenericModal from "../GenericModal";
import { Box, Button, ButtonGroup } from "@mui/material";
import ImageAssetModalList from "./Images/ImageAssetModalList";
import { MaybeGUID } from "../../../types/generic/GUID";
import MapAssetModalEditor from "./MapAssetModalEditor";
import useTrimMapAssets from "../../../hooks/assets/useTrimMapAssets";
import { Compress, ContentCut, Merge } from "@mui/icons-material";
import SoundAssetModalList from "./Sounds/SoundAssetModalList";
import useMergeMapAssets from "../../../hooks/assets/useMergeMapAssets";

interface MapAssetsDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export default function MapAssetsModal(props: MapAssetsDialogProps) {
    const [selectedAssetID, setSelectedAssetID] = React.useState<MaybeGUID>(undefined);
    const trimAssets = useTrimMapAssets();
    const mergeAssets = useMergeMapAssets();

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
                            <Button
                                onClick={mergeAssets}
                                variant={"outlined"}
                                color={"primary"}
                                endIcon={<Merge />}
                            >
                                Merge
                            </Button>
                            <Button
                                onClick={trimAssets}
                                variant={"outlined"}
                                color={"success"}
                                endIcon={<Compress />}
                                disabled
                            >
                                Compress
                            </Button>
                            <Button
                                onClick={trimAssets}
                                variant={"outlined"}
                                color={"error"}
                                endIcon={<ContentCut />}
                            >
                                Trim
                            </Button>
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
    )
}