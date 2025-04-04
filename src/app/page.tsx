'use client';
import Hero from "@/component/Hero";
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
        <main className="min-h-screen bg-gray-200">
            {/* {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
            {isContentReady && (
                <Hero />
            )} */}
            <Hero />
        </main>
    );
}
