import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import donationSound from "../assets/donation-sound.mp3";
import donation from "../assets/donation.webp";
import { verifyMessage } from "../utils";

const Alerts = () => {
	const params = useParams();
	const [access, setAccess] = useState<boolean | undefined>(undefined);
	const [isPlaying, setIsPlaying] = useState(true);
	const audioRef = useRef(new Audio(donationSound));

	useEffect(() => {
		if (params.addressWithSign) {
			const { address, sign } = qs.parse(params.addressWithSign);

			verifyMessage(
				"Generate an API key on CryptoDonny dapp",
				sign as string,
				address as string
			).then(res => {
				setAccess(res);
			});
		}
	}, [params.addressWithSign]);

	useEffect(() => {
		const playSound = () => {
			audioRef.current.play();
			setIsPlaying(prev => !prev);
			audioRef.current.onended = () => {
				setTimeout(() => setIsPlaying(prev => !prev), 2000);
				setTimeout(playSound, 10000);
			};
		};
		playSound();
	}, []);

	return (
		<div className="flex justify-center items-center text-center h-screen w-screen bg-[#00FF00]">
			{access ? (
				<div className="h-full">
					{isPlaying && (
						<>
							<img className="h-5/6 mb-5" src={donation} alt="Donation" />
							<h1
								className="text-5xl text-white font-bold mb-5"
								style={{
									textShadow: "1px 1px 6px black",
								}}
							>
								Name - 0.5 ETH!
							</h1>
						</>
					)}
				</div>
			) : (
				<div className="text-red-600 text-3xl">
					It seems like your link is broken. Try copying it again.
				</div>
			)}
		</div>
	);
};
export default Alerts;
