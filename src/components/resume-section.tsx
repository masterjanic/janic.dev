import { LucidePlus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Container from "~/components/ui/container";

export function ResumeSection() {
  return (
    <section id="resume" className="py-12 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:gap-32">
          <div className="text-center">
            <div className="relative">
              <span
                className="absolute inset-0 -z-10 select-none text-6xl font-black opacity-10 md:text-7xl"
                aria-hidden
              >
                Resume
              </span>
              <h2 className="text-3xl font-extrabold md:text-5xl">Resume</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="bg-accent/20 transition duration-300 hover:scale-[102%]">
              <CardHeader>
                <span className="text-primary text-3xl font-black tracking-tighter">
                  <time dateTime="2010">2010</time>-
                  <time dateTime="2022">2022</time>
                </span>
                <CardTitle className="text-2xl font-medium">
                  A-Levels (Abitur)
                </CardTitle>
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                  Prof. Dr. Max Schneider Gymnasium
                </span>
              </CardHeader>
              <CardContent>
                <ul>
                  <li className="[&>svg]:text-primary flex [&>svg]:mr-1.5 [&>svg]:mt-1">
                    <LucidePlus size={16} />
                    Advanced courses in mathematics and physics
                  </li>
                  <li className="[&>svg]:text-primary flex [&>svg]:mr-1.5 [&>svg]:mt-1">
                    <LucidePlus size={16} />
                    Participation in Cambridge course (C1) and working group
                    &lsquo;Computer networks&rsquo;
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-accent/20 transition duration-300 hover:scale-[102%]">
              <CardHeader>
                <span className="text-primary text-3xl font-black tracking-tighter">
                  <time dateTime="2022">2022</time>-Now
                </span>
                <CardTitle className="text-2xl font-medium">
                  B.Sc. Computer Science
                </CardTitle>
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                  IU International University of Applied Sciences
                </span>
              </CardHeader>
              <CardContent>
                <ul>
                  <li className="[&>svg]:text-primary flex [&>svg]:mr-1.5 [&>svg]:mt-1">
                    <LucidePlus size={16} />
                    Courses in software development, databases, and computer
                    networks
                  </li>
                  <li className="[&>svg]:text-primary flex [&>svg]:mr-1.5 [&>svg]:mt-1">
                    <LucidePlus size={16} />
                    Current average grade: 1.84
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
