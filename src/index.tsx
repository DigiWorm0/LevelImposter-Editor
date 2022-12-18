import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client';
import App from './screens/App';
import './hooks/Localization';
import './style/DarkMode.css';
import './style/Index.css';
import './style/Screens.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);