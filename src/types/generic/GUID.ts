type GUID = string & { __GUID: true };
export default GUID;
export type MaybeGUID = GUID | undefined;