"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type Streamer = {
  id: string;
  name: string;
  title?: string;
  viewers: number;
  thumbnail: string;
  url: string;
};

export default function StreamerCard({ streamer }: { streamer: Streamer }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="w-[280px] shrink-0 rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-border hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-[160px] overflow-hidden rounded-t-xl">
        <Image src={streamer.thumbnail} alt={streamer.name} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{streamer.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-500">
            {streamer.viewers.toLocaleString()} live
          </span>
        </div>
        {streamer.title ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{streamer.title}</p>
        ) : null}
        <Button asChild className="mt-2 bg-green-500 hover:bg-green-600 text-black">
          <Link href={streamer.url} target="_blank" rel="noopener noreferrer">
            View Stream
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}


