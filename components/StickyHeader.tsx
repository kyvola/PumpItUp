"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/modals/AuthModal";

export default function StickyHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-sm bg-green-500" />
          </motion.div>
          <span className="font-semibold text-green-500">PumpItUp</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/leaderboard"
            className={`text-sm hover:text-green-500 transition-colors ${pathname === "/leaderboard" ? "text-green-500" : "text-foreground"}`}
          >
            Leaderboard
          </Link>
          <Button onClick={() => setOpen(true)} className="bg-green-500 hover:bg-green-600 text-black">
            Sign Up / Log In
          </Button>
        </nav>
      </div>
      <AuthModal open={open} onOpenChange={setOpen} />
    </div>
  );
}


