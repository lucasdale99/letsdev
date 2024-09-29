import Header from "@/components/Header";
import { Timeline } from "@/components/Timeline";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Header />
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex flex-col items-center">
          <Timeline />
        </main>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"></footer>
    </div>
  );
}
