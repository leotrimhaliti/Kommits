'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { MessageEngine, Vibe, VIBES } from '@commitlol/engine';
import { RefreshCw, Copy, Share2 } from 'lucide-react';

export function Generator() {
    const [vibe, setVibe] = useState<Vibe>('professional');
    const [message, setMessage] = useState('');
    const [animate, setAnimate] = useState(false);

    const generate = () => {
        setAnimate(true);
        const msg = MessageEngine.generate(vibe);
        setMessage(msg);
        setTimeout(() => setAnimate(false), 200);
    };

    useEffect(() => {
        generate();
    }, [vibe]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-2xl mx-auto p-4">
            <div className="flex flex-wrap justify-center gap-2">
                {VIBES.map((v) => (
                    <Button
                        key={v}
                        variant={vibe === v ? 'default' : 'outline'}
                        onClick={() => setVibe(v)}
                        className="capitalize"
                    >
                        {v.replace('-', ' ')}
                    </Button>
                ))}
            </div>

            <Card
                className={`w-full p-12 flex flex-col items-center justify-center min-h-[300px] transition-all duration-200 cursor-pointer hover:shadow-lg ${animate ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
                onClick={copyToClipboard}
            >
                <p className="text-4xl md:text-6xl font-black text-center leading-tight tracking-tight">
                    {message}
                </p>
                <p className="mt-8 text-muted-foreground text-sm">Click to copy</p>
            </Card>

            <div className="flex gap-4">
                <Button size="lg" onClick={generate} className="text-xl px-8 py-6">
                    <RefreshCw className="mr-2 h-6 w-6" />
                    Generate
                </Button>
            </div>
        </div>
    );
}
