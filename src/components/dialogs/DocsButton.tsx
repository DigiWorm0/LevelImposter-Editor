import { Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";

export default function DocsButton() {
    return (
        <Tooltip2
            content="Open Documentation"
            position="bottom">
            <Button
                minimal
                icon="help"
                onClick={() => { window.open("https://docs.levelimposter.net/"); }} />
        </Tooltip2>
    );
}