import LIProperties from "@/types/li/LIProperties";

export interface MapElementProperties extends LIProperties {
    [key: string]: any;

    /**
     * The name of the element.
     * Visible in the editor and applied to the GameObject at runtime.
     */
    name?: string;

    /**
     * The type of element (e.g., "util-blank", "util-button1", etc.).
     * Used to determine which properties are available for this element in the editor.
     * Also used to determine how the element is built at runtime.
     */
    type?: string;
}