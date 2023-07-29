const Main = () => {
	return (
		<div className="flex justify-between items-center min-h-screen px-36">
			<div>
				<h1
					className="text-7xl mb-7 font-black max-w-xl"
					style={{
						backgroundImage:
							"linear-gradient(47deg, rgba(149,99,255,1) 25%, rgba(164,120,255,1) 50%, rgba(173,134,255,1) 75%, rgba(184,149,255,1) 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
				>
					Donation alerts for your stream
				</h1>
				<p className="font-extrabold mb-7 text-2xl">No fees, safe and fast!</p>
				<button>Connect Wallet</button>
			</div>

			<img className="mr-5" src="https://placehold.co/300x350" alt="main-img" />
		</div>
	);
};
export default Main;
