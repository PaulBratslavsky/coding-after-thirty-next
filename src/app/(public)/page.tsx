import Link from "next/link";
import { OWNER_NAME, YOUTUBE_URL } from "@/lib/site";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Building things with AI, on camera.</h1>
        <p className={styles.lead}>
          I&apos;m {OWNER_NAME}. On Coding With Paul I build real projects with AI tools and
          make videos about what works, what doesn&apos;t, and why.
        </p>
        <Button asChild size="lg">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </Button>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Our YouTube tools</h2>
        <p className={styles.cardText}>
          I use private tools that connect to my own YouTube channels through Google&apos;s APIs, to
          read my videos and analytics and to update titles, descriptions and thumbnails after I
          review them. They work only on channels I own and are not offered to anyone else.
        </p>
        <div className={styles.cardLinks}>
          <Link href="/privacy" className={styles.link}>
            Privacy policy
          </Link>
          <Link href="/terms" className={styles.link}>
            Terms of service
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: "mx-auto max-w-5xl space-y-16 px-4 py-16 md:py-24",
  hero: "max-w-3xl space-y-6",
  title: "text-4xl font-bold tracking-tight md:text-6xl",
  lead: "text-lg leading-8 text-muted-foreground md:text-xl",
  card: "max-w-3xl space-y-4 rounded-xl border border-border p-6 md:p-8",
  cardTitle: "text-2xl font-semibold",
  cardText: "leading-7 text-muted-foreground",
  cardLinks: "flex flex-wrap gap-6 text-sm",
  link: "font-medium underline underline-offset-4",
};
