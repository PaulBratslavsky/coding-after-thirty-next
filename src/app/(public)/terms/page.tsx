import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, CONTACT_EMAIL, OWNER_NAME } from "@/lib/site";
import { ExternalLink, LegalPage, LegalSection, styles } from "@/components/custom/legal-page";

export const metadata: Metadata = {
  title: `${APP_NAME} Terms of Service`,
};

export default function TermsPage() {
  return (
    <LegalPage title={`${APP_NAME} Terms of Service`}>
      <LegalSection heading="What this covers">
        <p className={styles.paragraph}>
          These terms cover {APP_NAME}, a personal tool built by {OWNER_NAME} to manage his own
          YouTube channels. It is not a public service: there are no sign-ups, and only its owner
          uses it.
        </p>
      </LegalSection>

      <LegalSection heading="YouTube">
        <p className={styles.paragraph}>
          {APP_NAME} uses YouTube API Services. By using it you agree to be bound by the{" "}
          <ExternalLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalLink>
          , and Google&apos;s handling of your data is covered by the{" "}
          <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Using it">
        <ul className={styles.list}>
          <li>Use it only on YouTube channels you own or are authorized to manage.</li>
          <li>Follow YouTube&apos;s terms and Community Guidelines in anything you change with it.</li>
          <li>
            Review every change before you confirm it: {APP_NAME} changes a thumbnail, title,
            description or tags only when you ask and confirm.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Your data">
        <p className={styles.paragraph}>
          How {APP_NAME} handles data from Google is described in the{" "}
          <Link href="/privacy" className={styles.link}>
            privacy policy
          </Link>
          . You can remove its access at any time on your Google account&apos;s{" "}
          <ExternalLink href="https://myaccount.google.com/connections">
            third-party connections page
          </ExternalLink>
          .
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p className={styles.paragraph}>
          {APP_NAME} is provided as is, without warranty of any kind. To the extent the law allows,{" "}
          {OWNER_NAME} is not liable for any loss arising from its use, including changes made to a
          channel or limits on Google&apos;s API quota.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p className={styles.paragraph}>
          These terms, or {APP_NAME} itself, may change or stop at any time; changes are posted on
          this page with a new date. Questions go to{" "}
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
