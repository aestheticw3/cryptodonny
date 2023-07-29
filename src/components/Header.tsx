import BtcLogo from "../assets/btc-logo.svg";
import MetamaskLogo from "../assets/metamask-logo.svg";

const Header = () => {
	return (
		<header className="fixed w-screen top-0 left-0 px-5 py-3 flex justify-between items-center font-black bg-[#27262C] border-b border-b-[#383241]">
			<div className="flex items-center text-xl">
				<img src={BtcLogo} alt="Bitcoin Logo" className="w-5 mr-1" />
				Crypto<span className="text-t-primary text-xl">Donny</span>
			</div>

			<button className="px-2 py-1">
				<img src={MetamaskLogo} alt="Metamask Logo" className="w-5" />
			</button>
		</header>
	);
};
export default Header;
