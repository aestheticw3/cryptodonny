/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { Buffer } from "buffer";
import { formatBalance } from "../utils/index.ts";

interface WalletState {
	accounts: any[];
	balance: string;
	chainId: string;
	connected: boolean;
}

interface MetaMaskContextData {
	wallet: WalletState;
	hasProvider: boolean | null;
	error: boolean;
	errorMessage: string;
	userSign: string;
	isConnecting: boolean;
	disconnectMetaMask: () => void;
	connectMetaMask: () => void;
	generateAPIKey: () => void;
	clearError: () => void;
}

const disconnectedState: WalletState = {
	accounts: [],
	balance: "",
	chainId: "",
	connected: false,
};

export const MetaMaskContext = createContext<MetaMaskContextData>(
	{} as MetaMaskContextData
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
	const [hasProvider, setHasProvider] = useState<boolean | null>(null);

	const [isConnecting, setIsConnecting] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [userSign, setUserSign] = useState<string>("");

	const clearError = () => setErrorMessage("");

	const [wallet, setWallet] = useState(disconnectedState);
	// useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
	const _updateWallet = useCallback(async (providedAccounts?: any) => {
		const accounts =
			providedAccounts ||
			(await window.ethereum.request({ method: "eth_accounts" }));

		setUserSign("");

		if (accounts.length === 0) {
			// If there are no accounts, then the user is disconnected
			setWallet(disconnectedState);
			return;
		}

		const balance = formatBalance(
			await window.ethereum.request({
				method: "eth_getBalance",
				params: [accounts[0], "latest"],
			})
		);
		const chainId = await window.ethereum.request({
			method: "eth_chainId",
		});

		const connected = true;

		setWallet({ accounts, balance, chainId, connected });
	}, []);

	const updateWalletAndAccounts = useCallback(
		() => _updateWallet(),
		[_updateWallet]
	);
	const updateWallet = useCallback(
		(accounts: any) => _updateWallet(accounts),
		[_updateWallet]
	);

	/**
	 * This logic checks if MetaMask is installed. If it is, some event handlers are set up
	 * to update the wallet state when MetaMask changes. The function returned by useEffect
	 * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
	 * is unmounted.
	 */
	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
			setHasProvider(Boolean(provider));

			if (provider) {
				updateWalletAndAccounts();
				window.ethereum.on("accountsChanged", updateWallet);
				window.ethereum.on("chainChanged", updateWalletAndAccounts);
			}
		};

		getProvider();

		return () => {
			window.ethereum?.removeListener("accountsChanged", updateWallet);
			window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
		};
	}, [updateWallet, updateWalletAndAccounts]);

	const connectMetaMask = async () => {
		setIsConnecting(true);

		try {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			clearError();
			updateWallet(accounts);
		} catch (err: any) {
			setErrorMessage(err.message);
		}

		setIsConnecting(false);
	};

	const disconnectMetaMask = () => {
		setWallet(prev => ({ ...prev, connected: false }));
	};

	// TODO: Move converting to utils

	const generateAPIKey = async () => {
		const message = "Generate an API key on CryptoDonny dapp";
		try {
			const from = wallet.accounts[0];
			const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
			const sign = await window.ethereum.request({
				method: "personal_sign",
				params: [msg, from],
			});

			setUserSign(sign);
		} catch (err: any) {
			setErrorMessage(err.message);
		}
	};

	return (
		<MetaMaskContext.Provider
			value={{
				wallet,
				hasProvider,
				error: Boolean(errorMessage),
				errorMessage,
				userSign,
				isConnecting,
				connectMetaMask,
				disconnectMetaMask,
				generateAPIKey,
				clearError,
			}}
		>
			{children}
		</MetaMaskContext.Provider>
	);
};
