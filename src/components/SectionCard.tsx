import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import MonoGlitch from "./MonoGlitch";

export interface SectionItem {
  title: string;
  modalTitle?: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  link?: { text: string; url: string };
  image?: string;
  images?: string[];
  video?: string;
}

interface SectionCardProps {
  title: string;
  items: SectionItem[];
  disableGlitch?: boolean;
  badge?: string;
}

const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="mb-4">
      <div className="relative rounded-sm border border-border overflow-hidden">
        <img
          src={images[current]}
          alt={`${title} - slide ${current + 1}`}
          className="w-full h-auto"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-1.5 text-foreground hover:bg-background transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrent((c) => Math.min(images.length - 1, c + 1))}
              disabled={current === images.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-1.5 text-foreground hover:bg-background transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === current ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SectionCard = ({ title, items, disableGlitch, badge }: SectionCardProps) => {
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
    if (activeIndex !== null && activeIndex < items.length - 1) {
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

  const item = activeIndex !== null ? items[activeIndex] : null;
  const useGlitch = !disableGlitch && hasNavigatedRef.current;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, items.length]);

  return (
    <>
      {/* Card with scrollable preview */}
      <div className="border border-border rounded-sm bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <span className="text-sm font-medium text-foreground tracking-wide uppercase">
            {title}
          </span>
          {badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium border border-border rounded-sm bg-accent/50 text-muted-foreground">
              {badge}
            </span>
          )}
        </div>
        <div className="max-h-[120px] overflow-y-auto">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => openModal(i)}
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
      {item && (
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

              <div className="mb-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {title}
                </span>
              </div>

              <h2 className="text-lg font-semibold tracking-wide mb-4 text-foreground break-words">
                {useGlitch ? (
                  <MonoGlitch text={item.modalTitle || item.title} />
                ) : (
                  item.modalTitle || item.title
                )}
              </h2>
            </div>

            {/* Scrollable content area */}
            <div key={activeIndex} className="flex-1 overflow-y-auto px-8 pb-4 min-h-0 animate-fade-in">
              {item.video && (
                <div className="relative w-full aspect-video mb-4 rounded-sm overflow-hidden border border-border">
                  <iframe
                    src={item.video.replace("youtu.be/", "youtube.com/embed/").replace("watch?v=", "embed/")}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}

              {item.images && item.images.length > 0 && (
                <ImageCarousel images={item.images} title={item.title} />
              )}

              {item.image && !item.images && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto rounded-sm border border-border mb-4"
                />
              )}
              {item.subtitle && (
                <p className="text-xs text-muted-foreground mb-4 break-words">
                  {item.subtitle}
                </p>
              )}

              {item.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 break-words">
                  {item.description}
                </p>
              )}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground mb-4">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="break-words">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs border border-border rounded-sm bg-accent/50 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {item.link && (
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors inline-block"
                >
                  {item.link.text}
                </a>
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
                {activeIndex! + 1} / {items.length}
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
