import Link from "next/link";
import { ArrowRight, Database, FileText, Key, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <header className="container mx-auto px-4 py-20 md:py-32">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="inline-block rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-[1px]">
                        <div className="rounded-full bg-black px-4 py-1 text-sm">Introducing the Next Generation CMS</div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                        Content Management,{" "}
                        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Reimagined</span>
                    </h1>
                    <p className="max-w-[700px] text-zinc-400 md:text-xl">
                        A powerful, flexible CMS built for developers and content creators. Store and manage your content as key-value pairs, documents, and
                        media.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-opacity hover:opacity-90">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-zinc-800 hover:bg-zinc-900">
                            View Demo
                        </Button>
                    </div>
                </div>
            </header>

            {/* Dashboard Preview */}
            <section className="container mx-auto px-4 py-16">
                <div className="relative mx-auto max-w-5xl">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl" />
                    <div className="relative overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
                        <Image src="" alt="CMS Dashboard" className="h-auto w-full" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-24">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features for Modern Content Management</h2>
                    <p className="mx-auto max-w-2xl text-zinc-400">
                        Everything you need to create, manage, and deliver content across all your digital channels.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={<Key className="h-6 w-6" />}
                        title="Key-Value Content"
                        description="Store and manage your content as flexible key-value pairs, making it easy to structure and retrieve your data."
                    />
                    <FeatureCard
                        icon={<FileText className="h-6 w-6" />}
                        title="Document Management"
                        description="Create, edit, and organize documents with a powerful editor and version control system."
                    />
                    <FeatureCard
                        icon={<Image className="h-6 w-6" alt="image 1" src="" />}
                        title="Media Library"
                        description="Upload, organize, and optimize images and other media assets for your digital experiences."
                    />
                    <FeatureCard
                        icon={<Database className="h-6 w-6" />}
                        title="Flexible Storage"
                        description="Choose how and where your content is stored with support for multiple database backends."
                    />
                    <FeatureCard
                        icon={<Layers className="h-6 w-6" />}
                        title="Content Modeling"
                        description="Define custom content models and relationships to match your specific business needs."
                    />
                    <FeatureCard
                        icon={<ArrowRight className="h-6 w-6" />}
                        title="API-First"
                        description="Access your content through a powerful API that integrates with any frontend or service."
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-24">
                <div className="rounded-3xl bg-zinc-900 p-8 text-center md:p-16">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Content Management?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-zinc-400">
                        Join thousands of developers and content creators who are already using our CMS to build amazing digital experiences.
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-opacity hover:opacity-90">
                        Start Building Today
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 border-t border-zinc-800 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 md:mb-0">
                            <h3 className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-xl font-bold text-transparent">
                                YourCMS
                            </h3>
                        </div>
                        <div className="flex gap-8">
                            <Link href="#" className="text-zinc-400 transition-colors hover:text-white">
                                Documentation
                            </Link>
                            <Link href="#" className="text-zinc-400 transition-colors hover:text-white">
                                Blog
                            </Link>
                            <Link href="#" className="text-zinc-400 transition-colors hover:text-white">
                                Pricing
                            </Link>
                            <Link href="#" className="text-zinc-400 transition-colors hover:text-white">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-zinc-500">© {new Date().getFullYear()} YourCMS. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: any) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">{icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-zinc-400">{description}</p>
        </div>
    );
}
