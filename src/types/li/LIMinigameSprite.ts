export default interface LIMinigameSprite {
    id: string;
    type: string;
    spriteData?: string;
}

export type MaybeLIMinigameSprite = LIMinigameSprite | undefined;