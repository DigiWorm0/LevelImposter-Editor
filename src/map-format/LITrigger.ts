import GUID from "@shared/types/GUID";

export default interface LITrigger {
    id: string;
    elemID?: GUID;
    triggerID?: string;
    properties?: Record<string, any>;
}