/* ────────────────────────── Header.jsx ──────────────────────────
   • Plain JavaScript / JSX (no TypeScript syntax)
   • Uses Tailwind `dark:` utilities for automatic colour switch
   • No trailing punctuation after {name}
   • Mobile pop-over + desktop bar, with theme toggle
   ─────────────────────────────────────────────────────────────── */

import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog = false }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume, darkMode } = data;

  /* wait for hydration before showing theme-dependent icons */
  useEffect(() => setMounted(true), []);

  /* theme toggle button (hidden until mounted to avoid mismatch) */
  const ThemeToggle =
    mounted && darkMode ? (
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <img
          className="h-6"
          src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
          alt="toggle theme"
        />
      </Button>
    ) : null;

  /* navigation links */
  const NavLinks = ({ blog }) => (
    <>
      {blog ? (
        <Button onClick={() => router.push("/")}>Home</Button>
      ) : (
        <>
          <Button onClick={handleWorkScroll}>Work</Button>
          <Button onClick={handleAboutScroll}>About</Button>
        </>
      )}

      {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
      {showResume && (
        <Button onClick={() => router.push("/resume")}>Resume</Button>
      )}
      <Button onClick={() => window.open("mailto:abir.bahri.1@ulaval.ca")}>
        Contact
      </Button>
      {ThemeToggle}
    </>
  );

  /* ───────────── render ───────────── */
  return (
    <>
      {/* ───────────── MOBILE HEADER ───────────── */}
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div
              className="flex items-center justify-between p-2"
              style={{ background: "var(--header-gradient)" }}
            >
              <h1
                onClick={() => router.push("/")}
                className="font-medium link text-gray-900 dark:text-white"
              >
                {name}
              </h1>

              <div className="flex items-center">
                {ThemeToggle}
                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                    alt="menu"
                  />
                </Popover.Button>
              </div>
            </div>

            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1 text-left">
                <NavLinks blog={isBlog} />
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      {/* ───────────── DESKTOP HEADER ───────────── */}
      <div
        className="
          hidden tablet:flex items-center justify-between
          sticky top-0 z-10 p-4
          text-gray-900 dark:text-white
        "
        style={{ background: "var(--header-gradient)" }}
      >
        <h1 onClick={() => router.push("/")} className="font-medium link mr-6">
          {name}
        </h1>

        <div className="flex">
          <NavLinks blog={isBlog} />
        </div>
      </div>
    </>
  );
};

export default Header;