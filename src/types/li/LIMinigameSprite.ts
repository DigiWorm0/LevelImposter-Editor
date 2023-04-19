import GUID from "../generic/GUID";

export default interface LIMinigameSprite {
    id: GUID;
    type: string;
    spriteData?: string;
}

export type MaybeLIMinigameSprite = LIMinigameSprite | undefined;