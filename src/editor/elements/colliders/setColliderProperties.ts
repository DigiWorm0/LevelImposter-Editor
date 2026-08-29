import GUID from "../../../types/common/GUID";
import {MapCommand} from "../../history/executeCommand";
import {getCollider} from "./getSelectedCollider";

export const setColliderName = (colliderID: GUID, name: string): MapCommand => map => {
    const collider = getCollider(map, colliderID);
    if (collider)
        collider.name = name;
};

export const setColliderSolid = (colliderID: GUID, isSolid: boolean): MapCommand => map => {
    const collider = getCollider(map, colliderID);
    if (collider)
        collider.isSolid = isSolid;
};

export const setColliderBlocksLight = (colliderID: GUID, blocksLight: boolean): MapCommand => map => {
    const collider = getCollider(map, colliderID);
    if (collider)
        collider.blocksLight = blocksLight;
};