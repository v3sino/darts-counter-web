'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { User, UserSchema } from '@/types/user';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<User>({ resolver: zodResolver(UserSchema) });

	const onSubmit = async (data: User) => {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: '/profile'
		});
	};
    
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
						Sign in to your account
					</h2>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<div className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-white"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										type="email"
										autoComplete="email"
										{...register('email', { required: true })}
										className="block w-full rounded-md border-0 bg-white/5 p-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									/>
									{errors.email && (
										<span className="text-red-500">Email is required</span>
									)}
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-white"
									>
										Password
									</label>
								</div>
								<div className="mt-2">
									<input
										id="password"
										type="password"
										autoComplete="current-password"
										{...register('password', { required: true })}
										className="block w-full rounded-md border-0 bg-white/5 p-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									/>
									{errors.password && (
										<span className="text-red-500">Password is required</span>
									)}
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-40"
								>
									{isSubmitting ? 'Signing In...' : 'Sign in'}
								</button>
							</div>
						</div>
					</div>
				</form>
				<Link href="/signup" className="mt-4 text-center text-white underline">
					Do not have an account? Sign up
				</Link>
			</div>
		</>
	);
};

export default SignIn;
