import { Button, Classes, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useOpenMap } from "../../hooks/fileio/useOpenMap";

export default function OpenButton() {
    const { t } = useTranslation();
    const openMapFile = useOpenMap();

    return (
        <>
            <Tooltip
                content={t("map.open") as string}
                position="bottom"
            >
                <Button
                    className={Classes.MINIMAL}
                    icon="folder-open"
                    onClick={openMapFile}
                />
            </Tooltip>
        </>
    );
}