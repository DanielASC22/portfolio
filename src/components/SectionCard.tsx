import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: SectionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center justify-between w-full px-4 py-3 border border-border rounded-sm bg-card hover:bg-accent transition-colors text-left"
      >
        <span className="text-sm font-medium text-foreground tracking-wide uppercase">
          {title}
        </span>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-6 max-h-[80vh] overflow-y-auto border border-border bg-card p-8 rounded-sm">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold tracking-wide uppercase mb-6 text-foreground">
              {title}
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionCard;
