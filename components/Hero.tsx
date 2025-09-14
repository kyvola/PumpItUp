"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center gap-6 py-24">
      <div className="relative w-[104px] h-[104px]">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-green-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <div className="absolute inset-2 rounded-full bg-foreground flex items-center justify-center">
          <Image src="/next.svg" alt="PUMPFUN" width={56} height={56} />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Don&apos;t Be A One Hit Wonder.
      </h1>
      <p className="text-base md:text-lg text-muted-foreground">
        Streamers recruit clippers. Clippers grow streams.
      </p>

      <div className="flex items-center gap-4 mt-2">
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-black">
          <Link href="/signup-streamer">Sign up as Streamer</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="border border-green-500 text-green-500 bg-transparent hover:bg-green-500/10">
          <Link href="/browse-clipper">Browse as Clipper</Link>
        </Button>
      </div>
    </section>
  );
}


