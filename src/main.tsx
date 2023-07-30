import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MetaMaskContextProvider } from "./providers/MetaMaskProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MetaMaskContextProvider>
			<App />
		</MetaMaskContextProvider>
	</React.StrictMode>
);
