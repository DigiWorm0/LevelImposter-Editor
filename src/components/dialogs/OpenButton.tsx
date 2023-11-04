import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useOpenMap } from "../../hooks/utils/openMap";

export default function OpenButton() {
    const { t } = useTranslation();
    const openMapFile = useOpenMap();

    return (
        <>
            <Tooltip2
                content={t("map.open") as string}
                position="bottom"
            >
                <Button
                    className={Classes.MINIMAL}
                    icon="folder-open"
                    onClick={openMapFile}
                />
            </Tooltip2>
        </>
    );
}