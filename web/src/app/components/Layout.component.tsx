"use client"

import React, { useState } from "react";
import {
    IconForms,
    IconBrandTabler,
    IconDrone,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { cn } from "../lib/utils";

export default function Layout({ children }: { children: React.ReactNode; }) {
    const links = [
        {
            label: "View Config",
            href: "/",
            icon: (
                <IconDrone className="text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Temperature Form",
            href: "/temperatureform",
            icon: (
                <IconForms className="text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "View Logs",
            href: "/viewlogs",
            icon: (
                <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row bg-neutral-800 w-full flex-1 max-w-[100vw] border border-neutral-700 overflow-hidden pt-4 pr-4 pl-4 md:pl-0",
                "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1">
                <div className="p-2 md:p-10 rounded-t-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 w-full h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-white whitespace-pre"
            >
                65010673
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};