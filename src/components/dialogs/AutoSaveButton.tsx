import { AnchorButton, Classes, Dialog, Menu } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import { useAutoSaves, useRevertAutoSave } from "../../hooks/useAutoSave";

export default function AutoSaveButton() {
    const { t } = useTranslation();
    const settings = useSettingsValue();
    const [isOpen, setIsOpen] = React.useState(false);
    const autoSaves = useAutoSaves();
    const revertAutoSave = useRevertAutoSave();

    return (
        <>
            <Tooltip2
                fill
                content={t("autosave.revert") as string}
                position="bottom">

                <AnchorButton
                    fill
                    className={Classes.MINIMAL}
                    icon={"history"}
                    onClick={() => setIsOpen(true)}
                    disabled={settings.autosave === false}
                />

            </Tooltip2>

            <Dialog
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                icon={"history"}
                title={t("autosave.revert") as string}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }}>
                    <Menu
                        style={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            border: "none",
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        {autoSaves.map((autoSave, i) => (
                            <MenuItem2
                                key={i}
                                icon={"map"}
                                text={autoSave.name}
                                onClick={() => {
                                    revertAutoSave(autoSave);
                                    setIsOpen(false);
                                }}
                            />
                        ))}

                        {autoSaves.length === 0 && (
                            <MenuItem2
                                text={t("autosave.noneFound") as string}
                                disabled
                            />
                        )}
                    </Menu>
                </div>

            </Dialog>
        </>
    );
}