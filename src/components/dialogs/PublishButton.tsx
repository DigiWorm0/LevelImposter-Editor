import { Button, Classes, Dialog, FormGroup } from "@blueprintjs/core";
import React from "react";
import useSettings from "../../hooks/useSettings";

export default function PublishButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings] = useSettings();

    return (
        <>
            <Button
                className={Classes.MINIMAL}
                icon="cloud-upload"
                text="Publish"
                onClick={() => { setIsOpen(true) }} />

            <Dialog
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                title="Publish"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }} >
                    <p>To Be Implemented 😉</p>
                </div>

            </Dialog>
        </>
    );
}