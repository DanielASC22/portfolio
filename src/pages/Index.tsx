import ChromaticGlitch from "@/components/ChromaticGlitch";
import SectionCard from "@/components/SectionCard";
import type { SectionItem } from "@/components/SectionCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Github, Linkedin, FileText, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import deishacksWin from "@/assets/deishacks-win.png";
import massShootingsPoster from "@/assets/mass-shootings-poster.jpg";

const distortionSlides = Object.values(
  import.meta.glob("@/assets/distortion/slide-*.jpg", { eager: true, import: "default" })
) as string[];

const HELLO_PHRASES = [
  "Hello",
  "Hola",
  "Bonjour",
  "Namaste",
  "Guten Tag",
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
    subtitle: "Brandeis University · Sebastian Kadener Lab · Oct 2025 – Present",
  },
  {
    title: "TAMID Group",
    subtitle: "Brandeis University · Oct 2025 – Present",
  },
  {
    title: "Intern — Brand New School",
    subtitle: "New York, NY · May 2025 – Jun 2025",
    bullets: [
      "Gained production-level proficiency in Houdini, building procedural node networks and a custom text-to-3D letterform system over 7 weeks.",
      "Developed skills in 3D modeling, lighting, rendering, and animation; produced experimental typography renders and a motion reel.",
      "Exhibited 500+ digital artworks in a multimedia gallery showcase, engaging 100+ attendees.",
    ],
  },
  {
    title: "Student — Code Nation",
    subtitle: "New York, NY · Oct 2022 – Jun 2024",
    bullets: [
      "Completed a two-year Google-hosted coding fellowship (~120+ hours), building multiple front-end projects with JavaScript and React.js.",
      "Participated in a Hackathon at Google's NY HQ, collaborating on a prototype hobby-matching web app.",
    ],
  },
  {
    title: "Generation Tech — JPMorganChase",
    subtitle: "New York, NY · Oct 2022 – Nov 2022",
    bullets: [
      "Collaborated with an 8-person team to design iPurify, a concept app addressing global water pollution.",
      "Built an animated mobile wireframe using Thunkable and researched environmental policy for real-world feasibility.",
    ],
  },
  {
    title: "Student — All Star Code",
    subtitle: "New York, NY · Jul 2022 – Aug 2022",
    bullets: [
      "Selected for a competitive 6-week Summer Intensive (5,900+ applicants, ~1,000 participants to date).",
      "Led full-stack development of a 50-resource Community Service Accessibility website, inspiring a $100 donation at the demo.",
    ],
  },
  {
    title: "Awards",
    bullets: [
      "Best Non-Technical Hack — DeisHacks 2026 · $500 award",
      "Posse Foundation Full-Tuition Scholarship — 1 of 12 selected from ~3,000 · $200K+ value",
      "F. Coit Johnson Academic Excellence Award — Perfect straight-A transcript · LREI 2025",
      "Owen Gerson Director's Award — Given to one student per year for lasting impact · LREI 2025",
      "1st Place Robot Design Award — NYC FIRST Lego League · 2019",
    ],
  },
];

const projectItems: SectionItem[] = [
  {
    title: "DeisHacks — Website Revamp",
    description:
      'Led a 48-hour hackathon sprint revamping the Charles River Museum of Industry & Innovation\'s website as Lead Product Developer. Won "Best Non-Technical Hack."',
    image: deishacksWin,
    link: { text: "View on Devpost →", url: "https://devpost.com/software/askdjaskd" },
  },
  {
    title: "ShareService",
    description:
      "Full-stack volunteering accessibility website built at All Star Code. An audience member donated $100 to a featured organization after the demo.",
    link: { text: "View project →", url: "https://danielasc22.github.io/ShareService/" },
  },
  {
    title: "Mass Shootings in America",
    description:
      "Data visualization project aiming to reveal patterns in mass shooting data to explore potential solutions.",
    image: massShootingsPoster,
  },
  {
    title: "Brand New School Gallery",
    description:
      "Multimedia gallery showcasing 500+ digital artworks from the Brand New School internship, exhibited via TV installation and prints.",
    video: "https://youtu.be/y2omaIYksDk",
  },
  {
    title: "Drawing in Distortion",
    description:
      "An exploration of 5-point perspective, experimenting with a unique way of viewing and representing life through distortion.",
    images: distortionSlides,
  },
];

const skillItems: SectionItem[] = [
  {
    title: "Languages & Frameworks",
    tags: ["JavaScript", "Python", "React.js", "HTML", "CSS", "TypeScript"],
  },
  {
    title: "Tools & Platforms",
    tags: ["GitHub", "Git", "Napari", "Houdini", "After Effects", "Figma", "Thunkable", "Mantra"],
  },
  {
    title: "Other",
    tags: [
      "Creative Direction",
      "Visual Storytelling",
      "Debugging",
      "Web Development",
      "Game Design",
      "Presentation Skills",
    ],
  },
];

const courseItems: SectionItem[] = [
  {
    title: "Computer Science",
    tags: [
      "COSI 12B: Advanced Programming Techniques in Java",
      "COSI 21A: Data Structures & Algorithms",
      "Discrete Math",
    ],
  },
  {
    title: "Biology",
    tags: ["Intro to Biology", "Molecular Biology", "Genetics"],
  },
];

const aboutItems: SectionItem[] = [
  {
    title: "Click here for more info",
    modalTitle: "My Story",
    description:
      "I'm driven by curiosity at the intersection of computer science and biology — from building computational tools for lab research to crafting creative digital experiences. Outside of academics, I love experimenting with generative art, exploring new cities, and finding ways technology can make a tangible difference. I thrive when collaborating on projects that blend analytical rigor with creative expression.",
  },
];

const ClockLocation = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <MapPin size={12} />
      <span>NYC / BOS</span>
      <span className="text-border">·</span>
      <span>{time} EST</span>
    </div>
  );
};

const LeetCodeCard = ({ className = "" }: { className?: string }) => {
  const { data, isLoading } = useLeetCodeStats();
  return (
    <div className={`border border-border rounded-sm bg-card overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
        <span className="text-sm font-medium text-foreground tracking-wide uppercase">LeetCode</span>
        <a
          href="https://leetcode.com/u/persheki/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Profile →
        </a>
      </div>
      <div className="grid grid-cols-4 gap-0 text-center flex-1">
        {[
          { label: "Solved", value: data?.totalSolved, color: "text-foreground" },
          { label: "Easy", value: data?.easySolved, color: "text-green-500" },
          { label: "Medium", value: data?.mediumSolved, color: "text-yellow-500" },
          { label: "Hard", value: data?.hardSolved, color: "text-red-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="py-3 border-r border-border last:border-r-0">
            <p className={`text-lg font-semibold ${color}`}>{isLoading ? "…" : (value ?? "—")}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-8 md:px-16 lg:px-24 py-16">
      <div className="w-full max-w-4xl space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-xl md:text-2xl font-light text-foreground">
              <ChromaticGlitch phrases={HELLO_PHRASES} interval={5000} className="inline" />
              <span className="text-muted-foreground">,</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">I'm Daniel Olusheki</h1>
          </div>
          <ClockLocation />
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          First-year Computer Science and Biology student at Brandeis University. STEM Posse Scholar, Oliver Scholar,
          and Dean's List recipient. Passionate about solving complex problems through creative and analytical thinking.
        </p>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SectionCard title="Experience" items={experienceItems} />
          <SectionCard title="Projects" items={projectItems} />
          <SectionCard title="Skills" items={skillItems} disableGlitch />
          <SectionCard title="Courses" items={courseItems} disableGlitch badge="4.00 GPA" />
          <LeetCodeCard className="h-full flex flex-col" />
          <SectionCard title="About Me" items={aboutItems} disableGlitch />
        </div>

        {/* Footer */}
        <footer className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-muted-foreground">
            <a
              href="mailto:dolusheki@gmail.com"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              dolusheki@gmail.com
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href="mailto:dolusheki@brandeis.edu"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              dolusheki@brandeis.edu
            </a>
            <span>·</span>
            <div className="flex items-center gap-3">
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
                href="https://github.com/DanielASC22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href={`${import.meta.env.BASE_URL}Daniel_Olusheki_Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Resume"
              >
                <FileText size={14} />
              </a>
            </div>
          </div>
          <ThemeToggle />
        </footer>
      </div>
    </div>
  );
};

export default Index;
