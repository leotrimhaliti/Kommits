import { Generator } from "@/components/generator";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex lg:flex-col">
        <h1 className="text-4xl font-bold mb-8 tracking-tighter text-center">
          Kommit.me
        </h1>
        <div className="mb-8 flex justify-center">
          <a href="/daily" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">View Daily Commit</a>
        </div>
        <Generator />
      </div>
    </main>
  );
}
