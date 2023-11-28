import { z } from 'zod';

const emailSchema = z.string().email('Invalid email format');

const passwordSchema = z
	.string()
	.min(6, 'Password must be at least 6 characters long');

export const UserSchema = z.object({
	email: emailSchema,
	password: passwordSchema
});

export type User = z.infer<typeof UserSchema>;
