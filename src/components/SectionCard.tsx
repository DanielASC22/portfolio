import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import MonoGlitch from "./MonoGlitch";

export interface SectionItem {
  title: string;
  content: React.ReactNode;
}

interface SectionCardProps {
  title: string;
  items: SectionItem[];
}

const SectionCard = ({ title, items }: SectionCardProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const goNext = () => {
    if (activeIndex !== null && activeIndex < items.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goPrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      {/* Card with scrollable preview */}
      <div className="border border-border rounded-sm bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground tracking-wide uppercase">
            {title}
          </span>
        </div>
        <div className="max-h-[120px] overflow-y-auto">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="group flex items-center justify-between w-full px-4 py-2.5 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0"
            >
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {item.title}
              </span>
              <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:text-foreground transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-6 max-h-[80vh] overflow-y-auto border border-border bg-card p-8 rounded-sm">
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glitch title */}
            <div className="mb-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {title}
              </span>
            </div>
            <h2 className="text-lg font-semibold tracking-wide mb-6 text-foreground">
              <MonoGlitch text={items[activeIndex].title} />
            </h2>

            {/* Content */}
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              {items[activeIndex].content}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Prev
              </button>
              <span className="text-xs text-muted-foreground">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                onClick={goNext}
                disabled={activeIndex === items.length - 1}
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

export default SectionCard;
