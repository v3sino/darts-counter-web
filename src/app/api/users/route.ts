import { NextRequest } from 'next/server';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { UserCreate } from '@/types/user';

const generateInviteHash = (uid: string): string => {
	const prefix = uid.slice(0, 3);
	const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;
	return `${prefix}${randomThreeDigitNumber}`;
};

export const POST = async (request: NextRequest) => {
	try {
		const data = await request.json();

		console.log('in post data', data);

		const userCreate: UserCreate = {
			inviteHash: generateInviteHash(data.uid),
			username: data.email
		};

		await setDoc(doc(db, 'users', data.uid), userCreate);

		return Response.json(
			{
				message: 'User created successfully'
			},
			{
				status: 201
			}
		);
	} catch (error) {
		return Response.json({ message: 'Unexpected error' }, { status: 500 });
	}
};
