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
					<div className="flex flex-col justify-evenly bg-slate-700 py-16 sm:flex-row">
						<Image
							src="/favicon.ico"
							width={200}
							height={200}
							alt="the best logo youve ever seen"
						/>
						<div className="flex flex-col justify-evenly">
							<h2 className="text-5xl">Intuitive score input</h2>
							<p className="w-96 pt-4">
								No need for counting in your head. No need for searching for
								specific buttons. Simply press what you have thrown.
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-evenly py-16 sm:flex-row">
						<div className="flex flex-col justify-evenly">
							<h2 className="text-5xl">Responsive design</h2>
							<p className="w-96 pt-4">
								Latest technologies used to provide a smooth and responsive
								experience.
							</p>
						</div>
						<Image
							src="/favicon.ico"
							width={200}
							height={200}
							alt="the best logo youve ever seen"
						/>
					</div>
					<div className="flex flex-col justify-evenly bg-slate-700 py-16 sm:flex-row">
						<Image
							src="/favicon.ico"
							width={200}
							height={200}
							alt="the best logo youve ever seen"
						/>
						<div className="flex flex-col justify-evenly">
							<h2 className="text-5xl">Online play support</h2>
							<p className="w-96 pt-4">
								Have a friend that you want to challenge at long-distance?
								Invite him to an online game and you can both input scores from
								your devices.
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-evenly py-16 sm:flex-row">
						<div className="flex flex-col justify-evenly">
							<h2 className="text-5xl">For your best darting experience</h2>
							<p className="w-96 pt-4">
								Developed by active darts players that understand your needs
								exactly. Do you have any feedback? Feel free to contact us.
							</p>
						</div>
						<Image
							src="/favicon.ico"
							width={200}
							height={200}
							alt="the best logo youve ever seen"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
