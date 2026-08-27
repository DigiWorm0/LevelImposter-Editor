import {MapCommand} from "../history/executeCommand";

export const setMapName = (v: string): MapCommand => map => map.name = v;
export const setMapDescription = (v: string): MapCommand => map => map.description = v;
export const setAuthorName = (v: string): MapCommand => map => map.authorName = v;
export const setIsPublic = (v: boolean): MapCommand => map => map.isPublic = v;
