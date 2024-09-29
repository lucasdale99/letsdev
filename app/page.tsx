import { Timeline } from "@/components/Timeline";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex-1 flex flex-col max-w-4xl">
        <main className="flex flex-col items-center">
          <Timeline />
        </main>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"></footer>
    </div>
  );
}
