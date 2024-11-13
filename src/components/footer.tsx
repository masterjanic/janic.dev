import { LucideGithub, LucideLinkedin } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import Container from "~/components/ui/container";
import { Separator } from "~/components/ui/separator";
import config from "~/config";

export default function Footer() {
  return (
    <footer className="border-primary">
      <Container>
        <Separator className="bg-primary h-[2px]" />
        <div className="my-12 flex flex-col gap-12 md:flex-row md:justify-between md:gap-24 lg:my-24">
          <div className="space-y-6">
            <h2 className="max-w-xs text-3xl font-extrabold md:text-4xl lg:max-w-lg">
              Do you want to work with me?
            </h2>
            <Button variant="outline" size="xl" asChild>
              <Link href={`mailto:${config.mail}`}>Get in touch</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            <li>
              <Link
                href={config.socials.github}
                className="[&>svg]:text-muted-foreground [&>svg]:hover:text-primary flex items-center [&>svg]:mr-1.5 [&>svg]:transition [&>svg]:duration-300"
                target="_blank"
              >
                <LucideGithub size={16} />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href={config.socials.linkedin}
                className="[&>svg]:text-muted-foreground [&>svg]:hover:text-primary flex items-center [&>svg]:mr-1.5 [&>svg]:transition [&>svg]:duration-300"
                target="_blank"
              >
                <LucideLinkedin size={16} />
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
        <div className="pb-6">
          <small className="text-muted-foreground">
            &copy; Copyright {new Date().getFullYear()}&nbsp;&nbsp;&ndash;{" "}
            <Link href="/">Janic Bellmann</Link>
          </small>
        </div>
      </Container>
    </footer>
  );
}
