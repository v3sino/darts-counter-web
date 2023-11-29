import Link from 'next/link';
import LoginStatus from '@/app/_components/LoginStatus';
import ProfileButton from '@/app/_components/ProfileButton';

export const NavBar = () => (
	<div className="sticky top-0 flex justify-between bg-blue-400 p-4 text-white">
		<div className="flex space-x-4">
			<Link href="/">Home</Link>
			<Link href="/statistics">Statistics</Link>
			<Link href="/tournament">Tournament</Link>
		</div>
		<div className="flex space-x-4">
			<ProfileButton />
			<LoginStatus />
		</div>
	</div>
);
