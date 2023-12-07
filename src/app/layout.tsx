import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from './_components/NavBar';
import SessionProvider from '@/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';
import Footer from './_components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | Darts Counter',
		default: 'Darts Counter'
	},
	description: 'Our darts counter application'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<div className="flex flex-col">
						<NavBar />
						<div className="min-h-screen bg-slate-900">{children}</div>
						<Footer />
					</div>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
