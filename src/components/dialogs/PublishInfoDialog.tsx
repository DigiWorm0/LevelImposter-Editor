import { Button, ButtonGroup, Dialog } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

export default function PublishInfoDialog(props: { isOpen: boolean, onAgree: () => void, onCancel: () => void }) {
    const settings = useSettingsValue();

    return (
        <>
            <Dialog
                isOpen={props.isOpen}
                onClose={props.onCancel}
                title="Publishing Information"
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >

                    <p>
                        Publishing a map allows you shares it to other users on the LevelImposter website and mod.
                    </p>
                    <p>
                        You should <b>ONLY</b> publish a map that is fully functional and playable by others.
                    </p>
                    <p>
                        If you are just testing your map, <b>DO NOT</b> publish it.
                        Instead, save the LIM file to your maps folder.
                    </p>
                    <p>
                        For more information, see the <a href="https://docs.levelimposter.net/">documentation</a>.
                    </p>

                    <ButtonGroup>
                        <Button
                            style={{ marginRight: 10 }}
                            onClick={props.onAgree}
                            text="Map is 100% Functional"
                            intent="success"
                        />
                        <Button
                            onClick={props.onCancel}
                            text="Map is NOT Functional"
                            intent="danger"
                        />
                    </ButtonGroup>
                </div>
            </Dialog>
        </>
    );
}