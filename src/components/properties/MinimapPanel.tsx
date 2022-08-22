import { Button } from "@blueprintjs/core";
import React from "react";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import DownloadCanvasDialog from "../dialogs/DownloadCanvas";
import PanelContainer from "./PanelContainer";

export default function MinimapPanel() {
    const [isVisible, setVisible] = React.useState(false);
    const [element] = useSelectedElem();

    if (!element
        || element.type !== "util-minimap")
        return null;

    return (
        <>
            <DownloadCanvasDialog
                isVisible={isVisible}
                setVisible={setVisible}
            />
            <PanelContainer title="Minimap">
                <Button
                    fill
                    minimal
                    icon="download"
                    text="Download Map Image"
                    disabled={isVisible}
                    onClick={() => setVisible(true)}
                />
            </PanelContainer>
        </>
    );
}
