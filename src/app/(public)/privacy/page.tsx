import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";
import { ExternalLink, LegalPage, styles } from "@/components/custom/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className={styles.paragraph}>
        Our private YouTube tools access YouTube data only for channels we own, with the owner&apos;s
        permission through Google sign-in, and use it only to manage those channels. We do not sell
        it or use it for advertising.
      </p>
      <p className={styles.paragraph}>
        Our use of information received from Google APIs adheres to the{" "}
        <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </ExternalLink>
        , including the Limited Use requirements. These tools use YouTube API Services; see the{" "}
        <ExternalLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalLink>{" "}
        and the <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>.
      </p>
      <p className={styles.paragraph}>
        Access can be revoked at any time on your Google account&apos;s{" "}
        <ExternalLink href="https://myaccount.google.com/connections">connections page</ExternalLink>.
        Questions: <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>.
      </p>
    </LegalPage>
  );
}
