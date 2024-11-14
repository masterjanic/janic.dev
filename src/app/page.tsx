import Hero from "~/components/hero";
import { ResumeSection } from "~/components/resume-section";
import PersonLd from "~/components/seo/person-ld";
import ProfilePageLd from "~/components/seo/profile-page-ld";

export default function Page() {
  return (
    <main>
      <Hero />
      <ResumeSection />
      <PersonLd />
      <ProfilePageLd />
    </main>
  );
}
