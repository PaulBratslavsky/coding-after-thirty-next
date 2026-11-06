import type { Metadata } from "next";
import { CONTACT_EMAIL, OWNER_NAME, SITE_NAME } from "@/lib/site";
import { ExternalLink, LegalPage, LegalSection, styles } from "@/components/custom/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <LegalSection heading="Who we are">
        <p className={styles.paragraph}>
          {SITE_NAME} is run by {OWNER_NAME}. This policy covers this website and the private tools
          we use to manage our own YouTube channels through Google&apos;s APIs (&ldquo;our
          tools&rdquo;). Our tools are not offered to the public; only we use them.
        </p>
      </LegalSection>

      <LegalSection heading="What our tools access">
        <p className={styles.paragraph}>
          When a channel owner signs in with Google and grants access, our tools use the YouTube Data
          API and the YouTube Analytics API with two permissions:
        </p>
        <ul className={styles.list}>
          <li>
            Manage the YouTube account: to read the channel&apos;s details, its videos (including
            private and unlisted ones), their titles, descriptions, tags and comments; and to set a
            video&apos;s custom thumbnail or change its title, description or tags.
          </li>
          <li>
            View YouTube Analytics reports: to read figures such as views, watch time and audience
            retention for the channel&apos;s own videos.
          </li>
        </ul>
        <p className={styles.paragraph}>
          Our tools do not upload videos, change a video&apos;s privacy setting, publish anything, or
          delete anything. They change a thumbnail, title, description or tags only when the channel
          owner asks for that change and confirms it.
        </p>
      </LegalSection>

      <LegalSection heading="How the data is used">
        <p className={styles.paragraph}>
          Data from Google is used only to show the channel owner information about their own
          channel and to make the changes they ask for. It is not sold, not used for advertising,
          and not shared with anyone except as described below.
        </p>
        <p className={styles.paragraph}>
          Our tools are operated through an AI assistant (Claude, by Anthropic). When the owner asks
          about their channel, the data needed to answer is sent to that assistant to carry out the
          request, under Anthropic&apos;s terms. We do not use Google user data to develop, improve
          or train AI models.
        </p>
      </LegalSection>

      <LegalSection heading="Where it is stored">
        <p className={styles.paragraph}>
          The sign-in token Google issues is stored only on the owner&apos;s own computer, in the
          operating system&apos;s secure credential store. Our tools have no server and keep no
          database of YouTube data: they fetch what a request needs from Google at the time. Copies
          of answers may remain in the assistant&apos;s conversation history on the owner&apos;s
          computer.
        </p>
      </LegalSection>

      <LegalSection heading="Keeping or removing access">
        <p className={styles.paragraph}>
          Access lasts until it is revoked. You can revoke it at any time on your Google
          account&apos;s{" "}
          <ExternalLink href="https://myaccount.google.com/connections">
            third-party connections page
          </ExternalLink>
          , after which our tools can no longer reach your account. To ask for anything held about
          you to be deleted, email{" "}
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>.
        </p>
      </LegalSection>

      <LegalSection heading="Google and YouTube">
        <p className={styles.paragraph}>
          Our tools use YouTube API Services. By using them you agree to be bound by the{" "}
          <ExternalLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalLink>
          . Google&apos;s handling of your data is covered by the{" "}
          <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>
          .
        </p>
        <p className={styles.paragraph}>
          Our use and transfer of information received from Google APIs adheres to the{" "}
          <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </ExternalLink>
          , including the Limited Use requirements.
        </p>
      </LegalSection>

      <LegalSection heading="This website">
        <p className={styles.paragraph}>
          This website has no sign-in and runs no analytics. Its host, Vercel, keeps standard
          request logs.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p className={styles.paragraph}>
          This website and our tools are not directed at children under 13, and we do not knowingly
          collect their data.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p className={styles.paragraph}>
          Changes to this policy are posted on this page with a new date. Questions go to{" "}
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
