"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    router.push("/auth/login");
    return null;
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

      <Button 
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        variant="destructive" 
        className="w-full sm:w-auto"
      >
        Sign Out
      </Button>
    </div>
  );
}