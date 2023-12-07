import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DownloadLinks from './_components/DownloadLinks';

export const metadata: Metadata = {
	title: 'Home | Darts Counter'
};

export default function Home() {
	return (
		<main>
			<div className="flex flex-col text-white">
				<div className="flex flex-col justify-evenly pt-16 sm:flex-row">
					<div className="flex w-full flex-col self-center p-2 text-start sm:w-1/3">
						<h1 className="text-5xl">Darts counter app !!!!</h1>
						<p className="pt-4 text-red-400">
							Amazing, we really needed another one of those.
						</p>
						<p className="pt-2">
							But this one is really good I promise you. SO much better than the
							other 8000 on appstore right now. Buy this one trust me you will
							not regret it. Also watch all the ads and preferably click on them
							and dont skip them please dont skip them. And also please support
							us via paypal to show your support because the devs have been
							working tirelessly on this app and they totally didnt make it as a
							school project previous semster.
						</p>
						<Link
							href="https://youtu.be/9PzHhXDJ3q8?si=ImTFpB0lcOpKdnvv&t=13"
							rel="noopener noreferrer"
							target="_blank"
							className="pt-6 underline"
						>
							If you are not convinced please watch this video an reconsider
						</Link>
					</div>
					<div className="flex self-center">
						<Image
							src="/favicon.ico"
							width={200}
							height={200}
							alt="the best logo youve ever seen"
						/>
					</div>
				</div>

				<div className="pt-8">
					<DownloadLinks />
				</div>

				<div className="pt-12">
					<p>Some screenshots here why other apps suck and ours is great.</p>
				</div>
			</div>
		</main>
	);
}
