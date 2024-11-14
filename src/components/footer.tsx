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
        <Separator className="h-[2px] bg-primary" />
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
                className="flex items-center [&>svg]:mr-1.5 [&>svg]:flex-shrink-0 [&>svg]:text-muted-foreground [&>svg]:transition [&>svg]:duration-300 [&>svg]:hover:text-primary"
                target="_blank"
              >
                <LucideGithub size={16} />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href={config.socials.linkedin}
                className="flex items-center [&>svg]:mr-1.5 [&>svg]:flex-shrink-0 [&>svg]:text-muted-foreground [&>svg]:transition [&>svg]:duration-300 [&>svg]:hover:text-primary"
                target="_blank"
              >
                <LucideLinkedin size={16} />
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-4 pb-6 md:flex-row md:items-center">
          <small className="text-muted-foreground">
            &copy; Copyright {new Date().getFullYear()}&nbsp;&nbsp;&ndash;{" "}
            <Link
              href="/"
              className="transition duration-300 hover:text-primary"
            >
              Janic Bellmann
            </Link>
          </small>
          <Link
            href="/legal"
            className="text-sm text-muted-foreground transition duration-300 hover:text-primary"
          >
            Legal
          </Link>
        </div>
      </Container>
    </footer>
  );
}
