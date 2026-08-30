import GUID from "@shared/types/GUID";
import {EditorCommand} from "../../../history/executeCommand";
import {getCollider} from "./getSelectedCollider";

export const setColliderName = (colliderID: GUID, name: string): EditorCommand => map => {
    const collider = getCollider(map, colliderID);
    if (collider)
        collider.name = name;
};

export const setColliderSolid = (colliderID: GUID, isSolid: boolean): EditorCommand => map => {
    const collider = getCollider(map, colliderID);
    if (collider)
        collider.isSolid = isSolid;
};

export const setColliderBlocksLight = (colliderID: GUID, blocksLight: boolean): EditorCommand => map => {
    const collider = getCollider(map, colliderID);
    if (collider)
        collider.blocksLight = blocksLight;
};