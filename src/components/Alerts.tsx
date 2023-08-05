import qs from "qs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyMessage } from "../utils";

const Alerts = () => {
	const params = useParams();
	const [access, setAccess] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		if (params.addressWithSign) {
			const { address, sign } = qs.parse(params.addressWithSign);

			verifyMessage(
				"Generate an API key on CryptoDonny dapp",
				sign as string,
				address as string
			).then(res => setAccess(res));
		}
	}, [params.addressWithSign]);

	return (
		<div className="pt-20">
			{access ? "You have got access!" : "Your link is wrong"}
		</div>
	);
};
export default Alerts;
