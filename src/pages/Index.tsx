import ChromaticGlitch from "@/components/ChromaticGlitch";
import SectionCard from "@/components/SectionCard";
import type { SectionItem } from "@/components/SectionCard";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/components/BlogCard";
import ThemeToggle from "@/components/ThemeToggle";
import Minesweeper from "@/components/Minesweeper";
import { Github, Linkedin, FileText, MapPin, Bomb } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import deishacksWin from "@/assets/deishacks-win.png";
import massShootingsPoster from "@/assets/mass-shootings-poster.jpg";

const distortionSlides = Object.values(
  import.meta.glob("@/assets/distortion/slide-*.jpg", { eager: true, import: "default" })
) as string[];

const bnsGallerySlides = Object.values(
  import.meta.glob("@/assets/bns-gallery/slide-*.jpg", { eager: true, import: "default" })
) as string[];

const ipurifySlides = Object.values(
  import.meta.glob("@/assets/ipurify/slide-*.jpg", { eager: true, import: "default" })
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
  // TODO: Put future experiences, like incoming CA @ Brandeis and COSI SSSP Tutoring
  {
    title: "Undergraduate Computational Biology Researcher",
    subtitle: "Brandeis University · Sebastian Kadener Lab · Oct 2025 – Present",
    link: { text: "Learn More →", url: "https://www.kadenerlab.com/" },
    bullets: [
      "Developed high-fidelity data visualizations using Python and Seaborn to map over 800 unique gene expression patterns across multiple brain sections, improving the accuracy of tissue identification for the research team",
      "Optimized data processing pipelines for identifying gene markers in fat body tissues, directly supporting a large-scale spatial transcriptomics visualization project",
    ],
  },
  {
    title: "TAMID Group",
    subtitle: "Brandeis University · Oct 2025 – Present",
    bullets: [
      "Developed a comprehensive business plan for a startup, including multi-tiered B2B and B2C outreach strategies alongside 3-year financial projections, targeted marketing, risk mitigation, and legal compliance frameworks"
    ]
  },
  {
    title: "Technical Designer Intern — Brand New School",
    subtitle: "New York, NY · May 2025 – Jun 2025",
    bullets: [
      "Gained production-level proficiency in Houdini, building procedural node networks and a custom text-to-3D letterform system over 7 weeks",
      "Developed skills in 3D modeling, lighting, rendering, and animation; produced experimental typography renders and a motion reel",
      "Exhibited 500+ digital artworks in a multimedia gallery showcase, engaging 100+ attendees",
    ],
  },
  {
    title: "Software Engineering Fellow — Google / Code Nation",
    subtitle: "New York, NY · Oct 2022 – Jun 2024",
    bullets: [
      "Completed a two-year Google-hosted coding fellowship (~120+ hours), building multiple front-end projects with JavaScript and React.js",
      "Participated in a Hackathon at Google's NY HQ, collaborating on a prototype hobby-matching web app",
    ],
  },
  {
    title: "Generation Tech — JPMorganChase",
    subtitle: "New York, NY · Oct 2022 – Nov 2022",
    bullets: [
      "Collaborated with an 8-person team and received mentorship from JPMC Software Engineers to design iPurify, a concept app addressing global water pollution",
      "Built and presented an animated mobile wireframe using Thunkable and researched environmental policy for real-world feasibility",
    ],
  },
  {
    title: "Fellow — All Star Code",
    subtitle: "New York, NY · Jul 2022 – Aug 2022",
    bullets: [
      "Selected for a competitive 6-week Summer Intensive (5,900+ applicants, ~1,000 participants to date)",
      "Led full-stack development of a 50-resource Community Service Accessibility website, inspiring a $100 donation at the demo",
    ],
  },
  {
    title: "Awards",
    bullets: [
      "Best Non-Technical Hack — DeisHacks 2026 · $1000 award",
      "Posse Foundation Full-Tuition Scholarship — 1 of 12 selected from ~3,000 · $200K+ value · 2029",
      "Dean's List — Brandeis University · 2025-2026",
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
    pdf: `${import.meta.env.BASE_URL}mass-shootings-poster.pdf`,
    image: massShootingsPoster,
  },
  {
    title: "iPurify - Generation Tech",
    description:
      `iPurify is a concept app designed to address global water pollution by connecting communities with local water quality data and purification resources. Developed during the Generation Tech program, the project combines mobile-first design with real-world environmental data to empower users to bring awareness to the issue of water pollution in their community.
      In response to the United Nations sustainable development challenge 6 of Clean water and sanitation, we built iPurify, a mobile application that incentivizes global resistance against unclean water and to make clean drinking water accessible to all.`,
    video: "https://www.youtube.com/watch?v=B3HVzXXTwAk",
    images: ipurifySlides,
  },
  {
    title: "BrandNewSchool Gallery",
    description:
      `Multimedia gallery showcasing 500+ digital artworks from the BrandNewSchool internship, exhibited via TV installation and prints.\nArtist Statement:\n
      My name is Daniel Olusheki, and I focused my senior project on the connections between technology and art. I’ve always been passionate about both of these topics: I’ve been drawing for as long as I can remember, and in the fall, I will study computer science at Brandeis University. I’ve always wanted to experiment with different types of art, so I decided to explore various media that emerged in distinct technological periods—charcoal (30,000 BCE), calligraphy (2000 BCE), watercolor (200 CE), photography (1820s), linoleum printing (Late 19th Century), pastels (Early 20th Century), and 3D art (1980s). This approach allowed me to learn about the different techniques required to create art in each medium. I decided to create self-portraits to maintain consistent subject matter in each medium and to push creativity.\n 
      The fundamental idea behind my 3D art was inspired by BrandNewSchool, a creative studio and advertising agency where I interned and where I learned Houdini, a 3D art software. They created an experimental ad for Google Cloud Next 2025, designed to push the boundaries of letterforms in order to create something distinct. This inspired me because letters can appear as simple shapes until you stretch the limits. Another person who influenced my art was William Kentridge, a charcoal artist who incorporated skillful composition and color into his drawings. I also referenced calligraphy guidebooks to emulate precise Gothic calligraphy and drew inspiration from the work of Van Gogh when creating my oil pastel self-portrait. Each of these different references depicted mastery in their respective media; however, I noticed that as technology advanced, the media gave less creative constraints and were significantly quicker to create.\n 
      Exploring all of these different media taught me several important lessons: the art techniques used before modern technology relied on essential visual principles, which are still crucial now in order to create artistic stuff. For example, learning software won't result in good art if you don’t have an understanding of color theory, composition, or lighting. These principles and skills are timeless and required of artists working in any media if they want to bring out the full potential of the medium. Creating all this art was eye-opening as it taught me that art is art, regardless of the different ways it’s made.`,
    video: "https://youtu.be/y2omaIYksDk",
    images: bnsGallerySlides,
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
    tags: ["Java", "Python", "React.js", "HTML", "CSS", "JavaScript", "Seaborn", "Matplotlib"],
  },
  {
    title: "Tools & Platforms",
    tags: ["GitHub", "Git", "Napari", "Houdini", "After Effects"],
  },
  {
    title: "Other",
    tags: [
      "Creative Direction",
      "Visual Storytelling",
      "Debugging",
      "Web Development",
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
      "COSI 91G: Introduction to Research Practice",
      "MATH 15A: Linear Algebra",
    ],
  },
  {
    title: "Biology",
    tags: ["BIOL 15A: Cells and Organisms", "BIOL 14A: Genetics and Genomics", "BIOL 91G: Introduction to Research Practice"],
  },
];

const blogPosts: BlogPost[] = [
  {
    title: "My Story",
    date: "Mar 2026",
    excerpt: "I'm driven by curiosity at the intersection of computer science and biology...",
    content: "I'm driven by curiosity at the intersection of computer science and biology — from building computational tools for lab research to crafting creative digital experiences. Outside of academics, I love experimenting with generative art, exploring new cities, and finding ways technology can make a tangible difference. I thrive when collaborating on projects that blend analytical rigor with creative expression.",
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
          First-year Computer Science and Biology student at Brandeis University who is passionate about solving complex problems through creative and analytical thinking.
        </p>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SectionCard title="Experience" items={experienceItems} />
          <SectionCard title="Projects" items={projectItems} />
          <SectionCard title="Skills" items={skillItems} disableGlitch />
          <SectionCard title="Courses" items={courseItems} disableGlitch badge="4.00 GPA" />
          <LeetCodeCard className="h-full flex flex-col" />
          <BlogCard posts={blogPosts} />
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
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Play Minesweeper"
                >
                  <Bomb size={14} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-fit" onContextMenu={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle className="text-sm font-medium tracking-wide uppercase">Minesweeper</DialogTitle>
                </DialogHeader>
                <Minesweeper />
              </DialogContent>
            </Dialog>
            <ThemeToggle />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
