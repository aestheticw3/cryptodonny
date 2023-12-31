import { BigNumber } from "alchemy-sdk";

export interface TxResponse {
	removed: boolean;
	transaction: {
		blockHash: string;
		blockNumber: string;
		from: string;
		gas: string;
		gasPrice: string;
		maxFeePerGas: string;
		maxPriorityFeePerGas: string;
		hash: string;
		input: string;
		nonce: string;
		to: string;
		transactionIndex: string;
		value: BigNumber;
		type: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		accessList: any[];
		chainId: string;
		v: string;
		r: string;
		s: string;
	};
}
