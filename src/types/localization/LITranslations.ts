import EnglishLocalization from "./English";
import SimplifiedChineseLocalization from "./SChinese";
import LITranslation from "./LITranslation";

const LITranslations: Record<string, LITranslation> = {
    "en-US": EnglishLocalization,
    /*"zh-CN": SimplifiedChineseLocalization,*/ // TODO: Implement the rest of translations
};

export default LITranslations;