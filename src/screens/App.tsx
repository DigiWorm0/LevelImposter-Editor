import { HotkeysProvider } from '@blueprintjs/core';
import { Provider } from 'jotai';
import React from 'react';
import CheckLanguage from '../components/dialogs/CheckLanguage';
import CheckMobile from '../components/dialogs/CheckMobile';
import { PROVIDER_SCOPE } from '../hooks/jotai/Jotai';
import { useSettingsValue } from '../hooks/jotai/useSettings';
import useEmbed from '../hooks/useEmbed';
import useIDParam from '../hooks/useIDParam';
import Canvas from './Canvas';
import Debug from './Debug';
import LeftSidebar from './LeftSidebar';
import OpenInEditor from './OpenInEditor';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';

export default function App() {
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
                        <CheckLanguage />
                    </>)}

                    {isEmbeded && (<>
                        <OpenInEditor />
                    </>)}
                </Provider>
            </HotkeysProvider>
        </div>
    );
}
