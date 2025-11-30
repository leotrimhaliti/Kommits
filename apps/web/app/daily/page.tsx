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
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-4 md:py-8">
            <div className="z-10 w-full max-w-2xl flex flex-col items-center">
                <div className="w-full flex justify-start mb-4 md:mb-6">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
                        </Button>
                    </Link>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold mb-1 tracking-tighter text-center">
                    Daily Commit
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 text-center">The same message for everyone, everywhere.</p>

                <Card
                    className="w-full p-6 md:p-10 flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px] cursor-pointer hover:shadow-lg active:scale-[0.98] transition-all"
                    onClick={copyToClipboard}
                >
                    <p className="text-xl sm:text-2xl md:text-4xl font-black text-center leading-tight tracking-tight">
                        {message}
                    </p>
                    <p className="mt-4 md:mt-6 text-muted-foreground text-xs md:text-sm">Tap to copy</p>
                </Card>

                <div className="mt-6 md:mt-10 text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">Next Daily Commit in:</p>
                    <p className="text-lg md:text-2xl font-mono font-bold">{timeLeft}</p>
                </div>
            </div>
        </main>
    );
}
