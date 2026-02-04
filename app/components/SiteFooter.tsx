import Link from "next/link";

const footerLinks = [
  { href: "/reviews", label: "Reviews" },
  { href: "/news", label: "News" },
  { href: "/tours", label: "Tours" },
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
  { href: "/contacts", label: "Contacts" }
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>Music 4 All</strong>
          <p className="muted">Editorial-grade coverage powered by a headless CMS.</p>
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
