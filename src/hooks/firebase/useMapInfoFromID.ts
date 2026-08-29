import {atom} from "jotai";
import {atomFamily} from "jotai/utils";
import {getMapInfoFromID} from "@editor/firebase/getMapInfoFromID";

export const mapInfoFromIDAtom = atomFamily((mapID: string) => atom(() => getMapInfoFromID(mapID)));