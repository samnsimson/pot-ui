import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="relative">
                    <div className="absolute -inset-0.5 animate-pulse rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
                    <div className="relative space-y-6 rounded-lg bg-black p-8">
                        <div className="flex justify-center">
                            <AlertCircle className="h-24 w-24 text-red-500" />
                        </div>
                        <h1 className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-7xl font-bold text-transparent">404</h1>
                        <h2 className="text-2xl font-semibold">Page not found</h2>
                        <p className="text-gray-400">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                        <div className="pt-4">
                            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                <Link href="/" className="inline-flex items-center">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to home
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
