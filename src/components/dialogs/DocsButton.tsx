import { Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import useTranslation from "../../hooks/useTranslation";

export default function DocsButton() {
    const translation = useTranslation();

    return (
        <Tooltip2
            content={translation.OpenDocs}
            position="bottom">
            <Button
                minimal
                icon="help"
                onClick={() => { window.open("https://docs.levelimposter.net/"); }} />
        </Tooltip2>
    );
}