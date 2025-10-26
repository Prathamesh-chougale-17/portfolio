"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { en } from "@/data/en";
import { trpc } from "@/server/client";

export function LeetcodeRating() {
  const username = en.leetcode_username;
  const { data, isLoading, error } = trpc.leetcode.getRating.useQuery({
    username,
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <Skeleton className="mx-auto mb-2 h-10 w-24" />
        <Skeleton className="mx-auto h-4 w-32" />
        <div className="mt-2 flex justify-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  if (error || !data?.success || !data.contestRating) {
    return (
      <div className="text-center">
        <div className="font-bold text-4xl text-primary">
          {en.about.stats.leetcodeRating || "--"}
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <div className="text-muted-foreground text-sm">LeetCode Rating</div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{error?.message || "User Not Found"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-2 font-bold text-4xl text-primary">
        {data.contestRating.toFixed(1)}
      </div>
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <div>LeetCode Rating</div>
        <Link
          className="flex items-center gap-1"
          href={`https://leetcode.com/${username}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icons.leetcode className="h-4 w-4 text-gray-600 transition-colors duration-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" />
        </Link>
      </div>
      {data.globalRanking && (
        <div className="mt-2 text-muted-foreground text-xs">
          Global Rank: {data.globalRanking.toLocaleString()}
          {data.topPercentage && ` (Top ${data.topPercentage.toFixed(2)}%)`}
        </div>
      )}
    </div>
  );
}
