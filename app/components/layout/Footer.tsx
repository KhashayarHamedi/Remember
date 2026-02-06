import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#feelings", label: "Begin" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="border-t border-ink/10 bg-surface-muted/50"
    >
      <div className="mx-auto max-w-content px-6 py-12 sm:px-page-x lg:px-page-x-lg">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <span className="font-serif text-lg font-semibold text-ink">
            Remember
          </span>
          <nav className="flex gap-8" aria-label="Footer">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-small text-ink-subtle transition-colors hover:text-ink-muted"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-small text-ink-subtle">
          © {year} Remember. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
