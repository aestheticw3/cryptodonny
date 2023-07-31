import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MetaMaskContextProvider } from "./providers/MetaMaskProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MetaMaskContextProvider>
			<App />
		</MetaMaskContextProvider>
	</React.StrictMode>
);
