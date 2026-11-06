import { POLICIES_UPDATED } from "@/lib/site";

type LegalPageProps = {
  readonly title: string;
  readonly children: React.ReactNode;
};

type ExternalLinkProps = {
  readonly href: string;
  readonly children: React.ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.updated}>Last updated: {POLICIES_UPDATED}</p>
      <div className={styles.body}>{children}</div>
    </article>
  );
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export const styles = {
  article: "mx-auto max-w-3xl px-4 py-12 md:py-16",
  title: "text-3xl font-bold tracking-tight text-foreground md:text-4xl",
  updated: "mt-2 text-sm text-muted-foreground",
  body: "mt-8 space-y-4",
  paragraph: "leading-7 text-muted-foreground",
  link: "font-medium text-foreground underline underline-offset-4",
};
