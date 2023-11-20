import Link from "next/link";

export const NavBar = () => (
	<div className="bg-blue-400 sticky top-0 p-2 text-white flex justify-between">
        <div className="flex space-x-4">
            <Link href="/">Home</Link>
            <Link href="/statistics">Statistics</Link>
            <Link href="/tournament">Tournament</Link>
        </div>
        <div>
            Login
        </div>
	</div>
);