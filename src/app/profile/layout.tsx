import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile'
};

const Profile = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};

export default Profile;
