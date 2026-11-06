import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { ExternalLink, LegalPage, styles } from "@/components/custom/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p className={styles.paragraph}>
        Our YouTube tools are private and used only by us, on channels we own. They use YouTube API
        Services, so the{" "}
        <ExternalLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalLink>{" "}
        apply. See our{" "}
        <Link href="/privacy" className={styles.link}>
          privacy policy
        </Link>
        .
      </p>
      <p className={styles.paragraph}>
        This website and our tools are provided as is, without warranty of any kind, and may change
        or stop at any time. Questions:{" "}
        <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>.
      </p>
    </LegalPage>
  );
}
