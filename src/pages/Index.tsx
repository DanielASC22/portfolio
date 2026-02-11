import ChromaticGlitch from "@/components/ChromaticGlitch";
import SectionCard from "@/components/SectionCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Github, Linkedin, FileText } from "lucide-react";

const HELLO_PHRASES = [
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "你好",
  "こんにちは",
  "안녕하세요",
  "مرحبا",
  "Ẹ n lẹ",
];

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-2xl space-y-10">
        {/* Glitch greeting + name */}
        <div className="space-y-1">
          <div className="text-xl md:text-2xl font-light text-foreground">
            <ChromaticGlitch
              phrases={HELLO_PHRASES}
              interval={3500}
              className="inline"
            /><span className="text-muted-foreground">,</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
            Daniel Olusheki
          </h1>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          First-year Computer Science and Biology student at Brandeis
          University. Interested in building things at the intersection of
          software and science.
        </p>

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

        {/* Footer */}
        <footer className="pt-4 pb-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="mailto:dolusheki@gmail.com"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              dolusheki@gmail.com
            </a>
            <span>·</span>
            <a
              href="mailto:dolusheki@brandeis.edu"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              dolusheki@brandeis.edu
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/olusheki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://github.com/olusheki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Resume"
            >
              <FileText size={14} />
            </a>
          </div>
          <ThemeToggle />
        </footer>
      </div>
    </div>
  );
};

export default Index;
