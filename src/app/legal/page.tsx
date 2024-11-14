import { type Metadata } from "next";
import Link from "next/link";

import BgTiles from "~/components/bg-tiles";
import Container from "~/components/ui/container";
import config from "~/config";

export const metadata: Metadata = {
  title: "Legal Notice",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main className="relative py-16 lg:py-20">
      <Container>
        <BgTiles />
        <article className="prose prose-neutral relative dark:prose-invert prose-h2:underline prose-h2:decoration-primary prose-p:text-justify prose-a:text-primary prose-a:no-underline prose-a:transition prose-a:duration-300 hover:prose-a:text-primary/80">
          <h1>Legal Notice</h1>
          <small>
            Last Change: <time dateTime="2024-11-14">14. November 2024</time>
          </small>
          <h2>Information according to § 5 DDG</h2>
          <p>
            Janic Bellmann <br />
            Lambarenestraße 21A <br />
            09350 Lichtenstein <br />
            Saxony, Germany
          </p>
          <p>
            Responsible for Content in accordance with § 18 (2) MStV: Janic
            Bellmann
          </p>
          <p>
            e-mail: <Link href={`mailto:${config.mail}`}>{config.mail}</Link>
          </p>
          <h2>Online Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute
            resolution (ODR), which you can find at{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://ec.europa.eu/consumers/odr"
            >
              https://ec.europa.eu/consumers/odr
            </Link>
            . Our email address can be found above in the imprint. We are
            neither willing nor obliged to participate in dispute resolution
            procedures before a consumer arbitration board.
          </p>
          <h2>Liability for Content</h2>
          <p>
            We are responsible for the content of our websites in accordance
            with the general laws, particularly § 7(1) of the Telemedia Act. All
            content is created with due care and to the best of our knowledge.
            Insofar as we refer to third-party websites via hyperlinks, we
            cannot guarantee the ongoing accuracy, completeness, or timeliness
            of the linked content, as these are outside of our control, and we
            have no influence on their future design. If you believe any content
            violates applicable law or is inappropriate, please inform us.
          </p>
          <h2>Liability for Links</h2>
          <p>
            Our offering includes links to external third-party websites, over
            whose content we have no influence. Therefore, we cannot assume any
            responsibility for these external contents. The provider or operator
            of the linked sites is always responsible for the content of those
            pages. The linked pages were checked for possible legal violations
            at the time of linking. Illegal content was not detectable at the
            time of linking. However, a permanent content review of the linked
            pages is not reasonable without concrete indications of a legal
            violation. Upon becoming aware of legal violations, we will
            immediately remove such links.
          </p>
          <h2>Copyright</h2>
          <p>
            The content and works created by the site operators on these pages
            are subject to German copyright law. The reproduction, editing,
            distribution, and any form of utilization beyond the scope of
            copyright law require the written consent of the respective author
            or creator. Downloads and copies of this page are only permitted for
            personal, non-commercial use. As far as the content on this page was
            not created by the operator, the copyrights of third parties are
            observed. In particular, third-party content is marked as such. If
            you become aware of any copyright infringement, please inform us
            accordingly. Upon becoming aware of legal violations, we will
            immediately remove such content.
          </p>
        </article>
      </Container>
    </main>
  );
}
