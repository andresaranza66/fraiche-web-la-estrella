"use client";

// components/Header.tsx

import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useCart } from "../../lib/cart/cart-context";
import Cart from "./Cart";
import HeaderMobile from "./HeaderMobile";
import PerfumeSearch from "./PerfumeSearch";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  logoText?: string;
  showCatalogosLink?: boolean;
  showHistoriaLink?: boolean;
  historiaHref?: string;
  catalogosHref?: string;
  searchHrefBase?: string;
  hideOnScrollDown?: boolean 
};

export default function HeaderMain({
  logoText = "",
  showCatalogosLink = true,
  showHistoriaLink = true,
  historiaHref = "/historia",
  catalogosHref = "/catalogos",
  searchHrefBase = "/catalogos",
  hideOnScrollDown = false
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollYRef = useRef<number>(0);
  const [forceShowHeader, setForceShowHeader] = useState(false);
  const forceShowTimeoutRef = useRef<number | null>(null);
  const prevCartCountRef = useRef<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
const { state: cartState } = useCart();
const cartCount = useMemo(
  () => cartState.items.reduce((sum, x) => sum + x.quantity, 0),
  [cartState.items],
)


useEffect(() => {
  const onScroll = () => {
    const currentY = window.scrollY;

    setIsScrolled(currentY > 20);

    if (!hideOnScrollDown) {
      lastScrollYRef.current = currentY;
      return;
    }

    if (forceShowHeader) {
      setIsHeaderHidden(false);
      lastScrollYRef.current = currentY;
      return;
    }

    const goingDown = currentY > lastScrollYRef.current;
    const beyondThreshold = currentY > 80;

    if (goingDown && beyondThreshold) {
      setIsHeaderHidden(true);
    } else {
      setIsHeaderHidden(false);
    }

    lastScrollYRef.current = currentY;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, [forceShowHeader, hideOnScrollDown]);

  useEffect(() => {
    const prev = prevCartCountRef.current;
    prevCartCountRef.current = cartCount;

    if (cartCount <= prev) return;

    setForceShowHeader(true);
    setIsHeaderHidden(false);

    if (forceShowTimeoutRef.current !== null) {
      window.clearTimeout(forceShowTimeoutRef.current);
    }

    forceShowTimeoutRef.current = window.setTimeout(() => {
      setForceShowHeader(false);
    }, 1400);
  }, [cartCount]);

  useEffect(() => {
    return () => {
      if (forceShowTimeoutRef.current !== null) {
        window.clearTimeout(forceShowTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    searchInputRef.current?.focus();
  }, [isSearchOpen]);

 

  return (
    <>
  <header
  className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300 transform-gpu font-[family-name:var(--font-headline)] ${
    isHeaderHidden ? "-translate-y-full" : "translate-y-0"
  } ${isScrolled ? "h-16 bg-white shadow-sm backdrop-blur" : "h-16 sm:h-24 bg-white"}`}
>
  <div className={`w-full px-6 lg:px-12 h-full transition-all duration-300 ${isScrolled ? "pt-2" : "pt-3"}`}>
    
    <div className="flex h-full items-center justify-between">
      <HeaderMobile
        cartCount={cartCount}
        isScrolled={isScrolled}
        isSearchOpen={isSearchOpen} 
        onToggleSearch={() => setIsSearchOpen((v) => !v)}
        onCloseSearch={() => setIsSearchOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <div className="hidden flex-1 items-center justify-between sm:flex">
      {/* LEFT SIDE */}
      <div className={`flex items-center transition-all duration-300 ${isScrolled ? "gap-6" : "gap-10"}`}>
        
        <Link
          href="/"
          className={`flex items-center gap-3 transition-all duration-300 hover:cursor-pointer ${
            isScrolled ? "-translate-y-0.5 scale-80" : "translate-y-0 scale-100"
          }`}
        >
          <Image
            src="/favicon.ico"
            alt={logoText}
            width={110}
            height={28}
            priority
            className={`transition-all duration-300 ${isScrolled ? "opacity-90" : "opacity-100"}`}
          />

          <div
            className={`font-bold tracking-wide transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
          >
            {logoText}
          </div>
        </Link>

        <nav className={`flex items-center transition-all duration-300 ${isScrolled ? "gap-4" : "gap-6"}`}>
          {showCatalogosLink ? (
            <div className="group relative">
              <Link
                href={catalogosHref}
                className={`font-[family-name:var(--font-headline)] transition hover:text-gray-500 ${isScrolled ? "text-sm" : "text-lgç"}`}
              >
                Catalogos
              </Link>

              <div className="pointer-events-none absolute left-0 top-full pt-3 group-hover:pointer-events-auto">
                <div className="w-48 rounded-xl border border-[color:var(--color-neutral-200)] bg-white p-2 shadow-lg opacity-0 translate-y-1 transition duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                  <Link
                    href="/catalogos/hombres"
                    className="block rounded-lg px-3 py-2 text-sm text-[color:var(--color-neutral-900)] transition hover:bg-[color:var(--color-neutral-100)] font-[family-name:var(--font-headline)]"
                  >
                    Hombres
                  </Link>
                  <Link
                    href="/catalogos/damas"
                    className="block rounded-lg px-3 py-2 text-sm text-[color:var(--color-neutral-900)] transition hover:bg-[color:var(--color-neutral-100)] font-[family-name:var(--font-headline)]"
                  >
                    Damas
                  </Link>
                  <Link
                    href="/catalogos/unisex"
                    className="block rounded-lg px-3 py-2 text-sm text-[color:var(--color-neutral-900)] transition hover:bg-[color:var(--color-neutral-100)] font-[family-name:var(--font-headline)]"
                  >
                    Unisex
                  </Link>
                </div>
              </div>
            </div>
          ) : null}

          {showHistoriaLink ? (
            <Link
              href={historiaHref}
              className={`hidden md:inline font-[family-name:var(--font-headline)] transition hover:text-gray-500 ${isScrolled ? "text-sm" : "text-lg"}`}
            >
              Nuestra Historia
            </Link>
          ) : null}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className={`ml-auto flex items-center transition-all duration-300 ${isScrolled ? "gap-4" : "gap-5"}`}>
        <div
              className={`transition-all duration-300 ease-out ${
        isSearchOpen
          ? "w-[520px] opacity-100 overflow-visible"
          : "w-0 opacity-0 overflow-hidden"
          }`}
        >
          {isSearchOpen ? (
            <PerfumeSearch autoFocus={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          ) : null}
      </div>
    
        <button
          aria-label="Search"
          className="transition hover:text-gray-500 hover:cursor-pointer"
          type="button"
          onClick={() => setIsSearchOpen((v) => !v)}
        >
          <Search size={isScrolled ? 20 : 22} />
        </button>

        <button
        aria-label="Cart"
        className="relative transition hover:text-gray-500 cursor-pointer"
        type="button"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart size={isScrolled ? 20 : 22} />
        {cartCount > 0 ? (
          <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--color-primary-700)] px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        ) : null}
      </button>

        <Link
          href="/admin"
          aria-label="Admin Panel"
          className="transition hover:text-gray-500 cursor-pointer"
        >
          <User size={isScrolled ? 20 : 22} />
        </Link>
        </div>
    </div>
  </div>
  </div>
</header>
<Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
  </>
  );
}