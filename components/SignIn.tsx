import { signIn } from "@/auth";
import { Github } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex min-h-fit flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: "/dashboard",
            });
          }}
          className="flex flex-col space-y-4"
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            <Github className="h-4 w-4" />
            Sign in with GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
