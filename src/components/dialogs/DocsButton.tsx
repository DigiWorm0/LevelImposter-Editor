import { Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";

export default function DocsButton() {
    const { t } = useTranslation();

    return (
        <Tooltip2
            content={t("docs.open") as string}
            position="bottom">
            <Button
                minimal
                icon="manual"
                onClick={() => { window.open("https://docs.levelimposter.net/"); }} />
        </Tooltip2>
    );
}