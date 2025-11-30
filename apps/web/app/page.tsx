import { Generator } from "@/components/generator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-4 md:py-8">
      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
          <Image
            src="/white.png"
            alt="Kommits.me"
            width={320}
            height={100}
            className="h-20 md:h-28 w-auto mb-4 md:mb-8"
            priority
          />
        <a
          href="/daily"
          className="text-xs md:text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 mb-4 md:mb-6"
        >
          View Daily Commit
        </a>
        <Generator />
      </div>
    </main>
  );
}
