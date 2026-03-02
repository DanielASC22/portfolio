import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import MonoGlitch from "./MonoGlitch";

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  link?: { text: string; url: string };
}

interface BlogCardProps {
  posts: BlogPost[];
}

const BlogCard = ({ posts }: BlogCardProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const hasNavigatedRef = useRef(false);

  const openModal = (i: number) => {
    hasNavigatedRef.current = false;
    setActiveIndex(i);
    setClosing(false);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setActiveIndex(null);
      setClosing(false);
    }, 300);
  };

  const goNext = () => {
    if (activeIndex !== null && activeIndex < posts.length - 1) {
      hasNavigatedRef.current = true;
      setActiveIndex(activeIndex + 1);
    }
  };

  const goPrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      hasNavigatedRef.current = true;
      setActiveIndex(activeIndex - 1);
    }
  };

  const post = activeIndex !== null ? posts[activeIndex] : null;
  const useGlitch = hasNavigatedRef.current;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, posts.length]);

  return (
    <>
      {/* Card with scrollable preview */}
      <div className="border border-border rounded-sm bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <span className="text-sm font-medium text-foreground tracking-wide uppercase">
            BLOG
          </span>
        </div>
        <div className="max-h-[120px] overflow-y-auto">
          {posts.map((p, i) => (
            <button
              key={i}
              onClick={() => openModal(i)}
              className="group flex flex-col w-full px-4 py-2.5 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">
                  {p.title}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[10px] text-muted-foreground/70">{p.date}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground/70 line-clamp-2">{p.excerpt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {post && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm ${closing ? "animate-modal-overlay-out" : "animate-modal-overlay-in"}`}
          onClick={closeModal}
        >
          <div
            onClick={e => e.stopPropagation()}
            className={`relative w-full max-w-2xl mx-6 h-[70vh] flex flex-col border border-border bg-card rounded-sm ${closing ? "animate-modal-content-out" : "animate-modal-content-in"}`}
          >
            {/* Fixed header */}
            <div className="flex-shrink-0 p-8 pb-0">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  BLOG
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>

              <h2 className="text-lg font-semibold tracking-wide mb-4 text-foreground break-words">
                {useGlitch ? <MonoGlitch text={post.title} /> : post.title}
              </h2>
            </div>

            {/* Scrollable content area */}
            <div key={activeIndex} className="flex-1 overflow-y-auto px-8 pb-4 min-h-0 animate-fade-in">
              <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
              
              {post.link && (
                <div className="mt-6">
                  <a
                    href={post.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors inline-block"
                  >
                    {post.link.text}
                  </a>
                </div>
              )}
            </div>

            {/* Fixed footer navigation */}
            <div className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-t border-border">
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Prev
              </button>
              <span className="text-xs text-muted-foreground">
                {activeIndex! + 1} / {posts.length}
              </span>
              <button
                onClick={goNext}
                disabled={activeIndex === posts.length - 1}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
