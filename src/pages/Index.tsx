import ChromaticGlitch from "@/components/ChromaticGlitch";
import SectionCard from "@/components/SectionCard";
import type { SectionItem } from "@/components/SectionCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Github, Linkedin, FileText } from "lucide-react";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

const HELLO_PHRASES = [
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Ni hao",
  "Konnichiwa",
  "Annyeonghaseyo",
  "Marhaba",
  "Ẹ n lẹ",
  "As-salamu alaykum",
];

const experienceItems: SectionItem[] = [
  {
    title: "Undergraduate Computational Biology Researcher",
    content: (
      <div>
        <p className="text-xs text-muted-foreground">Brandeis University · Sebastian Kadener Lab · Oct 2025 – Present</p>
      </div>
    ),
  },
  {
    title: "TAMID Group",
    content: (
      <div>
        <p className="text-xs text-muted-foreground">Brandeis University · Oct 2025 – Present</p>
      </div>
    ),
  },
  {
    title: "Intern — Brand New School",
    content: (
      <div>
        <p className="text-xs text-muted-foreground">New York, NY · May 2025 – Jun 2025</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Gained production-level proficiency in Houdini, building procedural node networks and a custom text-to-3D letterform system over 7 weeks.</li>
          <li>Developed skills in 3D modeling, lighting, rendering, and animation; produced experimental typography renders and a motion reel.</li>
          <li>Exhibited 500+ digital artworks in a multimedia gallery showcase, engaging 100+ attendees.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Student — Code Nation",
    content: (
      <div>
        <p className="text-xs text-muted-foreground">New York, NY · Oct 2022 – Jun 2024</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Completed a two-year Google-hosted coding fellowship (~120+ hours), building multiple front-end projects with JavaScript and React.js.</li>
          <li>Participated in a Hackathon at Google's NY HQ, collaborating on a prototype hobby-matching web app.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Generation Tech — JPMorganChase",
    content: (
      <div>
        <p className="text-xs text-muted-foreground">New York, NY · Oct 2022 – Nov 2022</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Collaborated with an 8-person team to design iPurify, a concept app addressing global water pollution.</li>
          <li>Built an animated mobile wireframe using Thunkable and researched environmental policy for real-world feasibility.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Student — All Star Code",
    content: (
      <div>
        <p className="text-xs text-muted-foreground">New York, NY · Jul 2022 – Aug 2022</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Selected for a competitive 6-week Summer Intensive (5,900+ applicants, ~1,000 participants to date).</li>
          <li>Led full-stack development of a 50-resource Community Service Accessibility website, inspiring a $100 donation at the demo.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Awards",
    content: (
      <div>
        <ul className="space-y-2 text-xs">
          <li><span className="text-foreground font-medium">Best Non-Technical Hack</span> — DeisHacks 2026 · $500 award</li>
          <li><span className="text-foreground font-medium">Posse Foundation Full-Tuition Scholarship</span> — 1 of 12 selected from ~3,000 · $200K+ value</li>
          <li><span className="text-foreground font-medium">F. Coit Johnson Academic Excellence Award</span> — Perfect straight-A transcript · LREI 2025</li>
          <li><span className="text-foreground font-medium">Owen Gerson Director's Award</span> — Given to one student per year for lasting impact · LREI 2025</li>
          <li><span className="text-foreground font-medium">1st Place Robot Design Award</span> — NYC FIRST Lego League · 2019</li>
        </ul>
      </div>
    ),
  },
];

const projectItems: SectionItem[] = [
  {
    title: "DeisHacks — Website Revamp",
    content: (
      <div>
        <p className="text-xs mt-1">Led a 48-hour hackathon sprint revamping the Charles River Museum of Industry & Innovation's website as Lead Product Developer. Won "Best Non-Technical Hack."</p>
        <a href="https://devpost.com/software/askdjaskd" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors mt-2 inline-block">View on Devpost →</a>
      </div>
    ),
  },
  {
    title: "ShareService",
    content: (
      <div>
        <p className="text-xs mt-1">Full-stack volunteering accessibility website built at All Star Code. An audience member donated $100 to a featured organization after the demo.</p>
        <a href="https://danielasc22.github.io/ShareService/" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors mt-2 inline-block">View project →</a>
      </div>
    ),
  },
  {
    title: "Mass Shootings in America",
    content: (
      <div>
        <p className="text-xs mt-1">Data visualization project aiming to reveal patterns in mass shooting data to explore potential solutions.</p>
      </div>
    ),
  },
  {
    title: "Brand New School Gallery",
    content: (
      <div>
        <p className="text-xs mt-1">Multimedia gallery showcasing 500+ digital artworks from the Brand New School internship, exhibited via TV installation and prints.</p>
      </div>
    ),
  },
  {
    title: "Drawing in Distortion",
    content: (
      <div>
        <p className="text-xs mt-1">An exploration of 5-point perspective, experimenting with a unique way of viewing and representing life through distortion.</p>
      </div>
    ),
  },
];

const skillItems: SectionItem[] = [
  {
    title: "Languages & Frameworks",
    content: (
      <div className="flex flex-wrap gap-2">
        {["JavaScript", "React.js", "HTML", "CSS", "TypeScript"].map((s) => (
          <span key={s} className="px-2 py-1 text-xs border border-border rounded-sm bg-accent/50">{s}</span>
        ))}
      </div>
    ),
  },
  {
    title: "Tools & Platforms",
    content: (
      <div className="flex flex-wrap gap-2">
        {["GitHub", "Houdini", "After Effects", "Thunkable", "Mantra"].map((s) => (
          <span key={s} className="px-2 py-1 text-xs border border-border rounded-sm bg-accent/50">{s}</span>
        ))}
      </div>
    ),
  },
  {
    title: "Other",
    content: (
      <div className="flex flex-wrap gap-2">
        {["Creative Direction", "Visual Storytelling", "Debugging", "Web Development", "Game Design", "Presentation Skills"].map((s) => (
          <span key={s} className="px-2 py-1 text-xs border border-border rounded-sm bg-accent/50">{s}</span>
        ))}
      </div>
    ),
  },
];

const LeetCodeContent = () => {
  const { data, isLoading } = useLeetCodeStats();
  return (
    <div className="space-y-4">
      <p className="text-xs">Tracking my progress on algorithmic problem solving.</p>
      <div className="grid grid-cols-4 gap-3 text-center">
        {[
          { label: "Solved", value: data?.totalSolved },
          { label: "Easy", value: data?.easySolved },
          { label: "Medium", value: data?.mediumSolved },
          { label: "Hard", value: data?.hardSolved },
        ].map(({ label, value }) => (
          <div key={label} className="border border-border rounded-sm p-3">
            <p className="text-lg font-semibold text-foreground">
              {isLoading ? "…" : (value ?? "—")}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <a
        href="https://leetcode.com/u/persheki/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors inline-block"
      >
        View full profile →
      </a>
    </div>
  );
};

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-2xl space-y-5">
        {/* Glitch greeting + name */}
        <div className="space-y-1">
          <div className="text-xl md:text-2xl font-light text-foreground">
            <ChromaticGlitch
              phrases={HELLO_PHRASES}
              interval={5000}
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
          University. STEM Posse Scholar, Oliver Scholar, and Dean's List
          recipient. Passionate about solving complex problems through creative
          and analytical thinking.
        </p>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SectionCard title="Experience" items={experienceItems} />
          <SectionCard title="Projects" items={projectItems} />
          <SectionCard title="Skills" items={skillItems} />
          <SectionCard title="LeetCode" items={leetcodeItems} />
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
