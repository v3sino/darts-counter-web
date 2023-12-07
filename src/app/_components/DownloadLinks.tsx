import Image from 'next/image';

const DownloadLinks = () => {
	return (
		<div className="flex w-full justify-center">
			<a
				className="flex items-center gap-2 rounded-xl px-3 py-1.5 outline outline-2"
				href="https://www.apple.com/cz/app-store/"
                rel="noopener noreferrer"
				target="_blank"
			>
				<div className="w-10">
					<Image
						className="h-full w-full"
						src="https://www.svgrepo.com/show/25162/apple.svg"
						alt=""
						width={48}
						height={14}
					/>
				</div>
				<div className="">
					<div className="text-sm">Download on the</div>
					<div className="text-2xl">App Store</div>
				</div>
			</a>

			<a
				className="ml-4 flex items-center gap-2 rounded-xl px-3 py-1.5 outline outline-2"
				href="https://play.google.com/store/games?hl=cs&gl=US"
                rel="noopener noreferrer"
				target="_blank"
			>
				<div className="w-10">
					<Image
						className="h-full w-full"
						src="https://www.svgrepo.com/show/452223/google-play.svg"
						alt=""
						width={48}
						height={14}
					/>
				</div>
				<div className="">
					<div className="text-sm">GET IT ON</div>
					<div className="text-2xl">Google Play</div>
				</div>
			</a>
		</div>
	);
};

export default DownloadLinks;
