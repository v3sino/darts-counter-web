import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home | Darts Counter'
};

export default function Home() {
	return (
		<main>
			<div className="flex h-screen">
				<h1>Main page with info about app</h1>
			</div>
		</main>
	);
}
