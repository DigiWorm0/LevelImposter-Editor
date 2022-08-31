import EnglishLocalization from "./English";
import LITranslation from "./LITranslation";
import PirateLocalization from "./Pirate";

const LITranslations: Record<string, LITranslation> = {
    "en-US": EnglishLocalization,
    "pirate": PirateLocalization
};

export default LITranslations;