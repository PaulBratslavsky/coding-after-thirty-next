import Link from "next/link";
import { OWNER_NAME, SITE_NAME } from "@/lib/site";
import { ThemeToggle } from "@/components/custom/theme-toggle";

type PublicLayoutProps = {
  readonly children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link href="/" className={styles.brand}>
            {SITE_NAME}
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.bar}>
          <span>
            © {new Date().getFullYear()} {OWNER_NAME}
          </span>
          <nav className={styles.nav}>
            <Link href="/privacy" className={styles.navLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.navLink}>
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: "flex min-h-screen flex-col bg-background text-foreground",
  header: "border-b border-border",
  bar: "mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4",
  brand: "text-lg font-bold",
  main: "flex-1",
  footer: "border-t border-border text-sm text-muted-foreground",
  nav: "flex items-center gap-6",
  navLink: "hover:text-foreground",
};
