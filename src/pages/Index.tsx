import ChromaticGlitch from "@/components/ChromaticGlitch";
import SectionCard from "@/components/SectionCard";

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
        <div className="text-2xl md:text-3xl font-light text-foreground">
          <ChromaticGlitch
            phrases={HELLO_PHRASES}
            interval={3500}
            className="inline-block min-w-[200px]"
          />
          <span className="text-muted-foreground">,</span>
        </div>

        {/* Intro */}
        <div className="space-y-2">
          <h1 className="text-base md:text-lg font-normal text-foreground leading-relaxed">
            I'm <span className="font-semibold">Daniel Olusheki</span>
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

        {/* Email */}
        <div className="pt-2 text-xs text-muted-foreground">
          <span>Say </span>
          <ChromaticGlitch
            phrases={["HELLO WORLD", "GET IN TOUCH", "DROP A LINE"]}
            interval={4000}
            className="inline-block text-foreground font-medium"
          />
          <span className="block mt-1">
            <a
              href="mailto:daniel@example.com"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              daniel@example.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
