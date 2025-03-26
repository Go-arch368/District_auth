import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="bg-card p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Session Data</h2>
        <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <Button type="submit" variant="destructive" className="w-full sm:w-auto">
          Sign Out
        </Button>
      </form>
    </div>
  );
}