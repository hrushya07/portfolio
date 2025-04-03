'use client';
import Preloader from "@/component/Preloader";
import { useState, useEffect } from "react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentReady, setIsContentReady] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setIsContentReady(true);
            }, 100);
        }
    }, [isLoading]);

    return (
        <main className="min-h-screen">
            {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
            {isContentReady && (
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
                    <section className="space-y-4">
                        <h2 className="text-2xl">About Me</h2>
                        <p>This is a sample content section that demonstrates proper content structure.</p>
                    </section>
                </div>
            )}
        </main>
    );
}
