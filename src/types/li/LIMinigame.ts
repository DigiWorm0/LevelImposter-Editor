export default interface LIMinigame {
    id: string;
    type: string;
    spriteData?: string;
}

export type MaybeLIMinigame = LIMinigame | undefined;