import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {createRoot} from "react-dom/client";
import App from "./components/screens/App";
import "@editor/Localization";
import "./common.css";

// Create react root and render the app
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App/>);
