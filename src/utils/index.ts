// import { Buffer } from "buffer";

import { ethers } from "ethers";

export const formatBalance = (rawBalance: string) => {
	const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
	return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
	const chainIdNum = parseInt(chainIdHex);
	return chainIdNum;
};

export const formatAddress = (addr: string) => {
	return `${addr.substring(0, 2)}...${addr.substring(
		addr.length - 4,
		addr.length
	)}`;
};

export const verifyMessage = async (
	msg: string,
	sign: string,
	addr: string
): Promise<boolean | undefined> => {
	try {
		console.log(msg);
		console.log(sign);
		console.log(addr);

		return (
			ethers.utils.verifyMessage(msg, sign).toLowerCase() === addr.toLowerCase()
		);
	} catch (err) {
		console.log("Something went wrong: ", err);
	}
};

// export const convertStringAsUTF8Hex = (msg: string) => {
// 	return ;
// };
