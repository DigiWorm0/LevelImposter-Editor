export interface Language {
    label: string;
    value: string;
}
const SelectableLanguages: Language[] = [
    { label: "Auto", value: "auto" },
    { label: "English", value: "en" },
    { label: "Simplified Chinese", value: "zh-CN" },
];

export default SelectableLanguages;