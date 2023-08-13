import {
	Alchemy,
	AlchemySubscription,
	BigNumber,
	Network,
	Utils,
} from "alchemy-sdk";
import { parse } from "qs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import donationSound from "../assets/donation-sound.mp3";
import donation from "../assets/donation.webp";
import { TxResponse } from "../types";
import { verifyMessage } from "../utils";

const Alerts = () => {
	const settings = {
		apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
		network: Network.MATIC_MAINNET,
	};
	const alchemy = new Alchemy(settings);

	const params = useParams();

	const [access, setAccess] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [donationsQueue, setDonationsQueue] = useState<TxResponse[]>([]);
	const [curDon, setCurDon] = useState<TxResponse>();

	const audioRef = useRef(new Audio(donationSound));
	const playSoundRef = useRef(() => {
		setIsPlaying(true);
		audioRef.current.play();
	});
	audioRef.current.onended = () => {
		setTimeout(() => setIsPlaying(false), 2000);
	};

	console.log("Alerts render");

	useEffect(() => {
		const { address, sign } = parse(params.addressWithSign!);

		verifyMessage(
			"Generate an API key on CryptoDonny dapp",
			sign as string,
			address as string
		).then(res => {
			setAccess(Boolean(res));
		});

		setDonationsQueue(dons => [
			{
				removed: false,
				transaction: {
					blockHash:
						"0x794ce9d963c75591b843fa63047e0d79fa1a99f0be9d5785b46e67de06f1767",
					blockNumber: "0x2c0f14e",
					from: "0xdfea9cd587575948171d336506437bf392f09e5a",
					gas: "0xee48",
					gasPrice: "0x1d17e6fd04",
					maxFeePerGas: "0x23a766d5a0",
					maxPriorityFeePerGas: "0x86da13f26",
					hash: "0x5bba669b634eb3512c4bc7531127b372b3593da8315912fdbdbebbcc30c8f506",
					input: "0x",
					nonce: "0x18e",
					to: "0xdfea9cd587575948171d336506437bf392f09e5a",
					transactionIndex: "0x2f",
					value: BigNumber.from("0x2386f26fc10000"),
					type: "0x2",
					accessList: [],
					chainId: "0x89",
					v: "0x0",
					r: "0xc871efc45c6ce41a6827ba826c068f9c397d0b73367d993b15f09fafc5488291",
					s: "0x2348175a2b294e9d3cb9843368314c94f953bdfd49323b1b06b96f1d1ab6fd85",
				},
			},
			...dons,
		]);

		typeof address === "string" &&
			alchemy.ws.on(
				{
					method: AlchemySubscription.MINED_TRANSACTIONS,

					addresses: [
						{
							to: address,
						},
					],
					hashesOnly: false,
				},
				(tx: TxResponse) => {
					console.log(tx);
					setDonationsQueue(dons => [...dons, tx]);
				}
			);

		return () => {
			audioRef.current.onended = null;
			alchemy.ws.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		const checkDons = setInterval(() => {
			console.log("Checking has started...");
			console.log(donationsQueue);
			if (donationsQueue.length) {
				setCurDon(donationsQueue[0]);
				playSoundRef.current();
				setDonationsQueue(dons => dons.slice(1));
			}
		}, 5000);

		return () => {
			clearInterval(checkDons);
		};
	}, [donationsQueue]);

	return (
		<div className="flex justify-center items-center text-center h-screen w-screen">
			{access ? (
				<div className="h-full">
					{isPlaying && (
						<>
							<img className="w-full mb-5" src={donation} alt="Donation" />
							<h1
								className="text-2xl text-white font-bold mb-5"
								style={{
									textShadow: "1px 1px 6px black",
								}}
							>
								{curDon?.transaction.from}
								<br />
								{curDon?.transaction &&
									Utils.formatEther(curDon.transaction.value) + " MATIC!"}
							</h1>
						</>
					)}
				</div>
			) : (
				<div className="text-red-600 text-3xl">
					It seems like your link is broken. You should copy it again.
				</div>
			)}
		</div>
	);
};
export default Alerts;
