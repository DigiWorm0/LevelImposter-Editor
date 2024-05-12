import { Button, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import NewMapModal from "../modals/NewMapModal";

export default function NewMapButton() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <>
            <Tooltip
                content={t("map.new") as string}
                position="bottom"
            >
                <Button
                    minimal
                    icon="document"
                    onClick={() => setIsVisible(true)}
                />
            </Tooltip>

            <NewMapModal
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
            />
        </>
    );
}