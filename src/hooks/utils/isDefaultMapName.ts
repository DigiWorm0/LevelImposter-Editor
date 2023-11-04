import i18next from "i18next";
import { LANGUAGES } from "../../types/generic/Constants";

/**
 * Checks if the map name is the default name "New Map"
 * @param mapName Name of the map
 * @returns True if the map name is the default name
 */
export default function isDefaultName(mapName: string) {
    return LANGUAGES.map((i18nCode) => i18next.t("map.new", { lng: i18nCode })).includes(mapName);
}