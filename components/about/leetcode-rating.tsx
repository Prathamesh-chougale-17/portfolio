"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { en } from "@/data/en";
import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Icons } from "../icons";
import { trpc } from "@/server/client";

export function LeetcodeRating() {
  const username = en.leetcode_username;
  const { data, isLoading, error } = trpc.leetcode.getRating.useQuery({
    username,
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <Skeleton className="h-10 w-24 mx-auto mb-2" />
        <Skeleton className="h-4 w-32 mx-auto" />
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
        <div className="text-4xl font-bold text-primary">
          {en.about.stats.leetcodeRating || "--"}
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <div className="text-sm text-muted-foreground">LeetCode Rating</div>
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
      <div className="text-4xl font-bold text-primary mb-2">
        {data.contestRating.toFixed(1)}
      </div>
      <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
        <div>LeetCode Rating</div>
        <Link
          href={`https://leetcode.com/${username}`}
          className="flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.leetcode className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 h-4 w-4" />
        </Link>
      </div>
      {data.globalRanking && (
        <div className="mt-2 text-xs text-muted-foreground">
          Global Rank: {data.globalRanking.toLocaleString()}
          {data.topPercentage && ` (Top ${data.topPercentage.toFixed(2)}%)`}
        </div>
      )}
    </div>
  );
}
