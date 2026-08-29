import {atom} from "jotai";

// Used as a fallback if the clipboard API is unavailable (e.g., in insecure contexts or unsupported browsers)
export const localClipboardAtom = atom<string | undefined>(undefined);