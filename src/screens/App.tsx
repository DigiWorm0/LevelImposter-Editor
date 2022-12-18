import { HotkeysProvider } from '@blueprintjs/core';
import { Provider } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CheckMobile from '../components/dialogs/CheckMobile';
import { useSettingsValue } from '../hooks/jotai/useSettings';
import useEmbed from '../hooks/useEmbed';
import useIDParam from '../hooks/useIDParam';
import { PROVIDER_SCOPE } from '../types/generic/Constants';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import OpenInEditor from './OpenInEditor';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';

export default function App() {
    const { i18n } = useTranslation();
    const settings = useSettingsValue();
    const isEmbeded = useEmbed();
    useIDParam();

    React.useEffect(() => {
        if (!isEmbeded)
            window.onbeforeunload = () => {
                return 'Are you sure you want to leave? Unsaved changes will be lost.';
            }

        return () => {
            window.onbeforeunload = null;
        }
    }, []);

    React.useEffect(() => {
        if (settings.language === "auto")
            i18n.changeLanguage(navigator.language);
        else
            i18n.changeLanguage(settings.language);
    }, [settings.language]);

    return (
        <div className={"app" + (settings.isDarkMode === false ? "" : " bp4-dark")}>
            <HotkeysProvider>
                <Provider scope={PROVIDER_SCOPE}>
                    {!isEmbeded && (<>
                        <Topbar />
                        <LeftSidebar />
                    </>)}

                    <Canvas />

                    {!isEmbeded && (<>
                        <RightSidebar />
                        <CheckMobile />
                    </>)}

                    {isEmbeded && (<>
                        <OpenInEditor />
                    </>)}
                </Provider>
            </HotkeysProvider>
        </div>
    );
}
