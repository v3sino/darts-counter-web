import { z } from 'zod';

const emailSchema = z
	.string()
	.email()
	.refine(value => /\S+@\S+\.\S+/.test(value), {
		message: 'Invalid email format'
	});

const passwordSchema = z.string().min(6, 'Password too short');

export const UserSchema = z.object({
	email: emailSchema,
	password: passwordSchema
});

export type User = z.infer<typeof UserSchema>;
