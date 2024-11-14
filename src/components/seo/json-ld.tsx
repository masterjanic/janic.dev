import { type Graph, type Thing, type WithContext } from "schema-dts";

export default function JsonLd({
  schema,
}: {
  schema: WithContext<Thing> | Graph;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
