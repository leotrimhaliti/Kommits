'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { MessageEngine, Vibe, VIBES } from '@commitlol/engine';
import { RefreshCw } from 'lucide-react';

export function Generator() {
    const [vibe, setVibe] = useState<Vibe>('professional');
    const [message, setMessage] = useState('');
    const [animate, setAnimate] = useState(false);

    const generate = useCallback(() => {
        setAnimate(true);
        const msg = MessageEngine.generate(vibe);
        setMessage(msg);
        setTimeout(() => setAnimate(false), 200);
    }, [vibe]);

    useEffect(() => {
        generate();
    }, [generate]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 w-full">
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                {VIBES.map((v) => (
                    <Button
                        key={v}
                        variant={vibe === v ? 'default' : 'outline'}
                        onClick={() => setVibe(v)}
                        size="sm"
                        className="capitalize text-xs md:text-sm px-2.5 md:px-4"
                    >
                        {v.replace('-', ' ')}
                    </Button>
                ))}
            </div>

            <Card
                className={`w-full p-6 md:p-10 flex flex-col items-center justify-center min-h-[180px] md:min-h-[240px] transition-all duration-200 cursor-pointer hover:shadow-lg active:scale-[0.98] ${animate ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
                onClick={copyToClipboard}
            >
                <p className="text-2xl sm:text-3xl md:text-5xl font-black text-center leading-tight tracking-tight">
                    {message}
                </p>
                <p className="mt-4 md:mt-6 text-muted-foreground text-xs md:text-sm">Tap to copy</p>
            </Card>

            <Button onClick={generate} className="text-sm md:text-base px-6 py-2 md:px-8 md:py-3">
                <RefreshCw className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Generate
            </Button>
        </div>
    );
}
