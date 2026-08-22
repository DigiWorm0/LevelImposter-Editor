import GUID from "../common/GUID";

export default interface LITrigger {
    id: string;
    elemID?: GUID;
    triggerID?: string;
    properties?: Record<string, any>;
}

export type MaybeLITrigger = LITrigger | undefined;