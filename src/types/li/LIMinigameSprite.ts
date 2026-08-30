import GUID from "@shared/types/GUID";

export default interface LIMinigameSprite {
    id: GUID;
    type: string;
    spriteID?: GUID;

    /**
     * @deprecated Use spriteID instead
     */
    spriteData?: string;
}