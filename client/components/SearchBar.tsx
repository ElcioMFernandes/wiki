"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface SearchableItem {
  id: number;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SearchBarProps<T extends SearchableItem> {
  items: T[];
  placeholder: string;
  type: string;
}

export default function SearchBar<T extends SearchableItem>({
  items,
  placeholder,
  type,
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setIsOpen(true);
  }, [items, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />

        <Input
          type="text"
          className="pl-10 pr-10 bg-background"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length > 0) setIsOpen(true);
          }}
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 z-50">
          <div className="py-2">
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Resultados
            </p>

            {results.map((item) => (
              <Link
                key={item.id}
                href={`/${type}/${item.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex flex-col">
                  <span className="font-medium line-clamp-1">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-popover p-4 text-center shadow-xl z-50">
          <p className="text-sm text-muted-foreground">
            Não encontramos nada com esse nome.
          </p>
        </div>
      )}
    </div>
  );
}
