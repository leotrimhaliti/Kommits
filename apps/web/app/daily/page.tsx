'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MessageEngine } from '@commitlol/engine';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DailyPage() {
    const [message, setMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        setMessage(MessageEngine.getDailyMessage());

        const timer = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setUTCHours(24, 0, 0, 0);
            const diff = tomorrow.getTime() - now.getTime();

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
        toast.success('Copied daily commit!');
    };

    return (
        <main className="flex flex-1 flex-col items-center justify-center p-4">
            <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm flex flex-col">
                <div className="w-full flex justify-start mb-8">
                    <Link href="/">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </Link>
                </div>

                <h1 className="text-4xl font-bold mb-2 tracking-tighter text-center">
                    Daily Commit
                </h1>
                <p className="text-muted-foreground mb-8">The same message for everyone, everywhere.</p>

                <Card
                    className="w-full p-12 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:shadow-lg transition-all"
                    onClick={copyToClipboard}
                >
                    <p className="text-3xl md:text-5xl font-black text-center leading-tight tracking-tight">
                        {message}
                    </p>
                    <p className="mt-8 text-muted-foreground text-sm">Click to copy</p>
                </Card>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Next Daily Commit in:</p>
                    <p className="text-2xl font-mono font-bold">{timeLeft}</p>
                </div>
            </div>
        </main>
    );
}
