import React from 'react';
import { AnchorButton, Button, ButtonGroup, Classes } from "@blueprintjs/core";
import generateGUID from '../../hooks/generateGUID';
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSelectedLayerID, useSetLayers, useSetSelectedLayerID } from "../../hooks/jotai/useLayer";
import useTranslation from "../../hooks/useTranslation";
import AddObjectButton from './AddObjectButton';
import DeleteObjectButton from './DeleteObjectButton';
import { useRemoveElement } from '../../hooks/jotai/useElement';
import { useSelectedElemID } from '../../hooks/jotai/useSelectedElem';
import { Tooltip2 } from '@blueprintjs/popover2';

export default function MapButtons() {
    const translation = useTranslation();
    const saveHistory = useSaveHistory();
    const removeElement = useRemoveElement();
    const [selectedID, setSelectedID] = useSelectedElemID();

    const handleClick = () => {
        removeElement(selectedID);
        setSelectedID(undefined);
    }


    return (
        <ButtonGroup fill style={{ padding: 5 }} minimal>

            <AddObjectButton
                isSidePanel={true} />

            <DeleteObjectButton
                isSidePanel={true} />

        </ButtonGroup>
    );
}