import { Link } from "react-router-dom";

type Props = { isAuthenticated?: boolean; className?: string };
export default function NavBar({ isAuthenticated = false, className = "" }: Props) {
    return (
        <nav className={`bg-gray-800 ${className}`}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="block ml-6">
                            <div className="flex space-x-4 text-white">Strava stuff</div>
                        </div>
                    </div>
                    <Link
                        to="/athlete"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        {isAuthenticated ? "View athlete" : "Log in to Strava"}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
