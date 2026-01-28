import Link from "next/link";

const navLinks = [
  { href: "/reviews", label: "Reviews" },
  { href: "/news", label: "News" },
  { href: "/tours", label: "Tours" },
  { href: "/artists", label: "Artists" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          Music4All
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary" href="/reviews">
          Explore Music
        </Link>
      </div>
    </header>
  );
}
