"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

import PerfumeSearch from "./PerfumeSearch";

type HeaderMobileProps = {
  cartCount: number;
  isScrolled: boolean;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  onCloseSearch: () => void;
  onOpenCart: () => void;
};

export default function HeaderMobile({
  cartCount,
  isScrolled,
  isSearchOpen,
  onToggleSearch,
  onCloseSearch,
  onOpenCart,
}: HeaderMobileProps) {
  return (
    <div className="relative w-full sm:hidden">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="Fraiche" width={80} height={40} priority />
          </Link>

          <Link
            href="/catalogos"
            className="text-xs font-medium text-gray-600 transition hover:text-gray-900"
          >
            Catálogos
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            type="button"
            className="transition hover:text-gray-500 cursor-pointer"
            onClick={onToggleSearch}
          >
            <Search size={22} />
          </button>

          <button
            aria-label="Cart"
            className="relative transition hover:text-gray-500 cursor-pointer"
            type="button"
            onClick={onOpenCart}
          >
            <ShoppingCart size={isScrolled ? 20 : 22} />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--color-primary-700)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {isSearchOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-3 shadow-lg">
          <PerfumeSearch autoFocus={isSearchOpen} onClose={onCloseSearch} />
        </div>
      ) : null}
    </div>
  );
}
