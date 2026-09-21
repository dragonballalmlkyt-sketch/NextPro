"use client";

import { api } from "@/convex/_generated/api";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { Id } from "@/convex/_generated/dataModel";
import { UserX } from "lucide-react";

interface PresenceProps {
    roomId: Id<"Posts">;
    userId: string;
}

export default function Presence({ roomId, userId }: PresenceProps): React.ReactElement {
    const presenceState = usePresence(api.presence, roomId, userId);
    
    const activeCount = presenceState?.length ?? 0;

    return (
        <div className="w-full my-4">
            {activeCount === 0 || !presenceState ? (
                /* Empty State UI */
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/30 text-muted-foreground transition-all">
                    <div className="p-2 rounded-lg bg-background border shadow-xs">
                        <UserX className="size-4 text-muted-foreground/70" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">
                        No active users at the moment
                    </p>
                </div>
            ) : (
                /* Active Users UI */
                <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs shadow-xs transition-all">
                    {/* Header with status badge */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-foreground tracking-wide">
                            Active Now
                        </span>
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {activeCount}
                        </span>
                    </div>

                    {/* Users FacePile Display */}
                    <div className="pt-1">
                        <FacePile presenceState={presenceState ?? []} />
                    </div>
                </div>
            )}
        </div>
    );
}