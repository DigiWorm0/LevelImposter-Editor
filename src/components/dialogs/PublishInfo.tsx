import { useTranslation } from "react-i18next";

export default function PublishInfo() {
    const { t } = useTranslation();

    return (
        <>
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
            </div>
        </>
    );
}