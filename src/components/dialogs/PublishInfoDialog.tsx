import { Button, ButtonGroup, Dialog } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

export default function PublishInfoDialog(props: { isOpen: boolean, onAgree: () => void, onCancel: () => void }) {
    const settings = useSettingsValue();
    const { t } = useTranslation();

    return (
        <>
            <Dialog
                isOpen={props.isOpen}
                onClose={props.onCancel}
                title={t("map.publishInfo") as string}
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
                            text={t("publish.ok") as string}
                            intent="success"
                            icon="tick" />
                        <Button
                            onClick={props.onCancel}
                            text={t("publish.cancel") as string}
                            intent="danger"
                            icon="cross" />

                    </ButtonGroup>
                </div>
            </Dialog>
        </>
    );
}