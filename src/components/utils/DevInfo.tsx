import { useSettingsValue } from "../../hooks/useSettings";

export default function DevInfo(props: { children: React.ReactNode }) {
    const { isDevMode } = useSettingsValue();

    if (!isDevMode)
        return null;

    return (
        <p style={{ fontSize: 12, textAlign: "center" }}>
            {props.children}
        </p>
    );
}