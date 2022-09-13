import { Button, ButtonGroup, Dialog } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";

export default function PublishInfoDialog(props: { isOpen: boolean, onAgree: () => void, onCancel: () => void }) {
    const settings = useSettingsValue();
    const translation = useTranslation();

    return (
        <>
            <Dialog
                isOpen={props.isOpen}
                onClose={props.onCancel}
                title={translation.PublishInfo}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >

                    <p>
                        Publishing a map allows you shares it to other users on the LevelImposter website and mod.
                    </p>
                    <p>
                        In order to play your map online, it must either be:
                    </p>
                    <ul>
                        <li>Published (Publicly or Privately)</li>
                        Or...
                        <li>Installed locally via LIM</li>
                    </ul>
                    <p>
                        Map publishing is currently in beta, and is subject to change.
                    </p>
                    <p>
                        For more information, see the <a href="https://docs.levelimposter.net/">documentation</a>.
                    </p>

                    <ButtonGroup>

                        <Button
                            style={{ marginRight: 10 }}
                            onClick={props.onAgree}
                            text={translation.OK}
                            intent="success"
                            icon="tick" />
                        <Button
                            onClick={props.onCancel}
                            text={translation.Cancel}
                            intent="danger"
                            icon="cross" />

                    </ButtonGroup>
                </div>
            </Dialog>
        </>
    );
}