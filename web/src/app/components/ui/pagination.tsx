import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

export function Pagination({ totalPages = 10, setPage }: { totalPages: number, setPage: Function }) {
    const [active, setActive] = useState<number>(1);

    const next = () => {
        if (active === totalPages) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    return (
        <div className="flex items-center gap-8">
            <button
                onClick={() => { prev(); setPage(active); }}
                disabled={active === 1}
                className={cn("border-2 p-1 rounded-md border-stone-50", active === 1 && "border-stone-400")}
            >
                <ArrowLeftIcon strokeWidth={2} className={cn("h-4 w-4 dark:text-stone-50", active === totalPages && "text-stone-400")} />
            </button>
            <div className="font-normal">
                Page <strong className=" dark:text-white">{active}</strong> of{" "}
                <strong className="dark:text-white">{totalPages}</strong>
            </div>
            <button
                onClick={() => { next(); setPage(active); }}
                disabled={active === totalPages}
                className={cn("border-2 p-1 rounded-md border-stone-50", active === totalPages && "border-stone-400")}
            >
                <ArrowRightIcon strokeWidth={2} className={cn("h-4 w-4 dark:text-stone-50", active === totalPages && "text-stone-400")} />
            </button>
        </div>
    );
}