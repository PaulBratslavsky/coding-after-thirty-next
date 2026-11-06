import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, OWNER_NAME, SITE_NAME } from "@/lib/site";
import { ExternalLink, LegalPage, LegalSection, styles } from "@/components/custom/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <LegalSection heading="What this covers">
        <p className={styles.paragraph}>
          These terms cover this website and the private tools {SITE_NAME} ({OWNER_NAME}) uses to
          manage its own YouTube channels through Google&apos;s APIs (&ldquo;our tools&rdquo;). Our
          tools are not a public service: there are no sign-ups, and only we use them.
        </p>
      </LegalSection>

      <LegalSection heading="YouTube">
        <p className={styles.paragraph}>
          Our tools use YouTube API Services. By using them you agree to be bound by the{" "}
          <ExternalLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalLink>
          , and Google&apos;s handling of your data is covered by the{" "}
          <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Using them">
        <ul className={styles.list}>
          <li>Use them only on YouTube channels you own or are authorized to manage.</li>
          <li>Follow YouTube&apos;s terms and Community Guidelines in anything you change with them.</li>
          <li>
            Review every change before you confirm it: our tools change a thumbnail, title,
            description or tags only when you ask and confirm.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Your data">
        <p className={styles.paragraph}>
          How our tools handle data from Google is described in the{" "}
          <Link href="/privacy" className={styles.link}>
            privacy policy
          </Link>
          . You can remove their access at any time on your Google account&apos;s{" "}
          <ExternalLink href="https://myaccount.google.com/connections">
            third-party connections page
          </ExternalLink>
          .
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p className={styles.paragraph}>
          This website and our tools are provided as is, without warranty of any kind. To the extent
          the law allows, {OWNER_NAME} is not liable for any loss arising from their use, including
          changes made to a channel or limits on Google&apos;s API quota.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p className={styles.paragraph}>
          These terms, this website or our tools may change or stop at any time; changes are posted
          on this page with a new date. Questions go to{" "}
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
