import GUID from "../generic/GUID";

export default interface LIMinigameSprite {
    id: GUID;
    type: string;
    spriteID?: GUID;

    /**
     * @deprecated Use spriteID instead
     */
    spriteData?: string;
}

export type MaybeLIMinigameSprite = LIMinigameSprite | undefined;