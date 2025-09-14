"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

type SignInResponse = { error?: string | null } | undefined;

export default function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [role, setRole] = useState<"STREAMER" | "CLIPPER">("STREAMER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onRegister(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      schema.parse({ email, password });
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "Failed");
      }
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } catch (e) {
      const message = typeof e === "object" && e && "message" in e ? String((e as Error).message) : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function onLogin(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      schema.parse({ email, password });
      const res = (await signIn("credentials", { email, password, redirect: false })) as SignInResponse;
      if (res?.error) throw new Error(res.error);
      onOpenChange(false);
    } catch (e) {
      const message = typeof e === "object" && e && "message" in e ? String((e as Error).message) : "Invalid credentials";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Welcome to PumpItUp</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form action={onLogin} className="grid gap-3 mt-3">
              <div className="grid gap-1">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" name="email" type="email" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" name="password" type="password" required />
              </div>
              {error ? <div className="text-sm text-red-500">{error}</div> : null}
              <Button disabled={loading} className="bg-green-500 hover:bg-green-600 text-black">Log In</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form action={onRegister} className="grid gap-3 mt-3">
              <div className="grid gap-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" name="email" type="email" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" name="password" type="password" required />
              </div>
              <div className="grid gap-1">
                <Label>Role</Label>
                <div className="flex gap-2 text-sm">
                  <Button type="button" variant={role === "STREAMER" ? "default" : "secondary"} onClick={() => setRole("STREAMER")}>
                    Streamer
                  </Button>
                  <Button type="button" variant={role === "CLIPPER" ? "default" : "secondary"} onClick={() => setRole("CLIPPER")}>
                    Clipper
                  </Button>
                </div>
              </div>
              {error ? <div className="text-sm text-red-500">{error}</div> : null}
              <Button disabled={loading} className="bg-green-500 hover:bg-green-600 text-black">Create account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


