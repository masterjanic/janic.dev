import Image from "next/image";
import Link from "next/link";

import heroImage from "~/../public/images/janic-bellmann.webp";
import { Button } from "~/components/ui/button";
import Container from "~/components/ui/container";
import config from "~/config";

export default function Hero() {
  return (
    <section className="relative isolate h-[700px] bg-primary">
      <Container className="relative h-full">
        <div className="flex h-full items-center max-md:pb-96">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-lg">Hi, my name is</p>
              <h1 className="text-5xl font-black">Janic Bellmann</h1>
              <p className="font-mono text-lg">
                Developer & Student from Germany
              </p>
            </div>
            <Button variant="outline" size="xl" asChild>
              <Link href={`mailto:${config.mail}`}>Get in touch</Link>
            </Button>
          </div>
        </div>
        <div className="max-md:relative max-md:-mt-96 max-md:h-96">
          <Image
            src={heroImage}
            alt="Janic Bellmann"
            className="-z-10 select-none object-cover object-right"
            draggable={false}
            sizes="100vw"
            placeholder="empty"
            priority
            fill
          />
        </div>
      </Container>
    </section>
  );
}
