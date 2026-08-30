import GUID from "@/types/common/GUID";

export default interface LIScene {
    id: GUID;
    name: string;

    childrenIDs: GUID[];
}