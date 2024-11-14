import JsonLd from "~/components/seo/json-ld";
import config from "~/config";

export default function ProfilePageLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${config.baseUrl.origin}/#page`,
        mainEntity: {
          "@id": `${config.baseUrl.origin}/#person`,
        },
      }}
    ></JsonLd>
  );
}
