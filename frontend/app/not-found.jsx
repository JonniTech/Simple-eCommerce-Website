import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark px-6">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiAlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h1 className="text-6xl font-extrabold text-dark dark:text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold mb-4 text-dark dark:text-white">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or you don't have permission to access it.
                </p>
                <Link href="/" className="btn-primary inline-flex items-center justify-center px-8 py-3">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
