import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tournaments'
};

const TournamentLayout = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};

export default TournamentLayout;
