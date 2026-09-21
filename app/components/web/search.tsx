"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowUpRight, FileText, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Searchcom() {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = useQuery(
        api.Post.searchPost,
        term.trim().length >= 2 ? { searchTerm: term, limit: 5 } : "skip"
    );

    // إغلاق قائمة البحث عند النقر خارج المكون
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        setOpen(true);
    };

    const handleClear = () => {
        setTerm("");
        setOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-sm">
            {/* حقل الإدخال */}
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none transition-colors" />
                
                <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-9 pr-8 w-full h-10 transition-all duration-200 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                    value={term}
                    onChange={handleChange}
                    onFocus={() => term.length >= 2 && setOpen(true)}
                />

                {/* زر إفراغ النص */}
                {term && (
                    <button
                        onClick={handleClear}
                        type="button"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            {/* قائمة نتائج البحث (Dropdown) */}
            {open && term.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 w-full z-50 rounded-xl border bg-popover/95 backdrop-blur-md p-1 shadow-xl outline-none animate-in fade-in-0 zoom-in-95 transition-all">
                    
                    {/* أثناء التحميل */}
                    {results === undefined ? (
                        <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span>Searching posts...</span>
                        </div>
                    ) : results.length === 0 ? (
                        /* لا توجد نتائج */
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">No results found</p>
                            <p className="text-xs">We could not find anything matching results</p>
                        </div>
                    ) : (
                        /* عرض النتائج */
                        <div className="divide-y divide-border/40">
                            <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Articles ({results.length})
                            </div>
                            
                            <div className="space-y-0.5 pt-1">
                                {results.map((result) => (
                                    <Link
                                        key={result._id}
                                        href={`/blog/${result._id}`}
                                        onClick={() => {
                                            setOpen(false)
                                            setTerm("");
                                        }}
                                        className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-accent/80 hover:text-accent-foreground transition-all duration-150"
                                    >
                                        <div className="mt-0.5 p-1.5 rounded-md bg-muted group-hover:bg-background text-muted-foreground group-hover:text-primary transition-colors">
                                            <FileText className="h-4 w-4" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-1">
                                                    {result.title}
                                                </p>
                                                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0" />
                                            </div>
                                            {result.body && (
                                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                                                    {result.body}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}