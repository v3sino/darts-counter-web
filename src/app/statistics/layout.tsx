import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Statistics'
};

const StatisticsLayout = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};

export default StatisticsLayout;
