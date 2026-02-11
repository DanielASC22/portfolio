import ChromaticGlitch from "@/components/ChromaticGlitch";
import SectionCard from "@/components/SectionCard";
import { Github, Linkedin, FileText, Mail } from "lucide-react";

const HELLO_PHRASES = [
  "Hello World",
  "Bonjour",
  "Hola",
  "こんにちは",
  "Ciao",
  "Hallo",
];

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-2xl space-y-10">
        {/* Glitch greeting */}
        <div className="text-xl md:text-2xl font-light text-foreground">
          <ChromaticGlitch
            phrases={HELLO_PHRASES}
            interval={3500}
            className="inline"
          /><span className="text-muted-foreground">,</span>
        </div>

        {/* Intro */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
            Daniel Olusheki
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            First-year Computer Science and Biology student at Brandeis
            University. Interested in building things at the intersection of
            software and science.
          </p>
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SectionCard title="Experience">
            <p>Coming soon — work experience and internships will be listed here.</p>
          </SectionCard>
          <SectionCard title="Projects">
            <p>Coming soon — personal and academic projects will be showcased here.</p>
          </SectionCard>
          <SectionCard title="Skills">
            <p>Coming soon — languages, frameworks, and tools.</p>
          </SectionCard>
          <SectionCard title="LeetCode">
            <p>Coming soon — LeetCode stats and progress tracker.</p>
          </SectionCard>
        </div>

        {/* Footer links */}
        <footer className="pt-4 pb-8 space-y-4">
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/olusheki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/olusheki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Resume"
            >
              <FileText size={18} />
            </a>
          </div>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <a
              href="mailto:dolusheki@gmail.com"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              dolusheki@gmail.com
            </a>
            <span className="mx-2">·</span>
            <a
              href="mailto:dolusheki@brandeis.edu"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              dolusheki@brandeis.edu
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
