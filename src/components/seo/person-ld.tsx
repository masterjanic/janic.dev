import JsonLd from "~/components/seo/json-ld";
import config from "~/config";

export default function PersonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${config.baseUrl.origin}/#person`,
        description: "A student and developer from Germany.",
        jobTitle: "Student",
        email: config.mail,
        nationality: "Germany",
        birthDate: "2004-05-22",
        height: "1.77m",
        gender: "Male",
        name: "Janic Bellmann",
        url: config.baseUrl.origin,
        sameAs: Object.values(config.socials),
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "IU International University of Applied Sciences",
            sameAs: "https://www.iu.org",
          },
        ],
        knowsAbout: [
          "Web Development",
          "React",
          "JavaScript",
          "Next.js",
          "Programming",
        ],
        birthPlace: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lichtenstein",
            addressRegion: "Saxony",
            addressCountry: "Germany",
          },
        },
      }}
    />
  );
}
