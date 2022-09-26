import GUID from "../generic/GUID";

export default interface LITrigger {
    id: string;
    elemID?: GUID;
    triggerID?: string;
}

export type MaybeLITrigger = LITrigger | undefined;