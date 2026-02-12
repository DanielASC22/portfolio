import { useEffect, useRef, useCallback } from "react";

// Space at the beginning so empty/space characters scroll to index 0 (space)
const MASTER_STRING =
  " 0123456789.,·-•─~+:;=*π'\"\"┐┌┘└┼├┤┴┬│╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@aàbcdefghijklmnoòpqrstuüvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%()";

const GLITCH_COLORS = [
  "#00ffff",
  "#ff00ff",
  "#ffff00",
  "#00ff00",
  "#ff0000",
  "#0000ff",
  "#ffffff",
];

interface QueueItem {
  targetChar: string;
  targetIndex: number;
  currentIdxInMaster: number;
  isFinished: boolean;
  delay: number;
}

interface ChromaticGlitchProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

const ChromaticGlitch = ({
  phrases,
  interval = 4000,
  className = "",
}: ChromaticGlitchProps) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const queueRef = useRef<QueueItem[]>([]);
  const frameRef = useRef<number | null>(null);
  const currentTextRef = useRef("");
  const phraseIndexRef = useRef(0);

  const animate = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    let htmlOutput = "";
    let allFinished = true;

    queueRef.current.forEach((item) => {
      if (item.delay > 0) {
        item.delay--;
        // Show current character while waiting
        const char = MASTER_STRING[item.currentIdxInMaster] || " ";
        if (char === " ") {
          htmlOutput += " ";
        } else {
          htmlOutput += char;
        }
        allFinished = false;
        return;
      }

      if (item.currentIdxInMaster !== item.targetIndex) {
        allFinished = false;

        const step = 2;
        if (item.currentIdxInMaster < item.targetIndex) {
          item.currentIdxInMaster = Math.min(item.currentIdxInMaster + step, item.targetIndex);
        } else {
          item.currentIdxInMaster = Math.max(item.currentIdxInMaster - step, item.targetIndex);
        }

        const char = MASTER_STRING[item.currentIdxInMaster] || " ";
        if (char === " ") {
          htmlOutput += " ";
        } else {
          const color =
            GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];
          htmlOutput += `<span style="color:${color}">${char}</span>`;
        }
      } else {
        // Finished: render target char
        if (item.targetChar === " ") {
          htmlOutput += " ";
        } else {
          htmlOutput += item.targetChar;
        }
      }
    });

    // Trim trailing spaces so surrounding elements (like comma) stay snug
    const trimmed = htmlOutput.replace(/[ \s]+$/, "");
    el.innerHTML = trimmed;

    // Store the raw text for next transition
    currentTextRef.current = el.innerText;

    if (!allFinished) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const setText = useCallback(
    (newText: string) => {
      const oldText = currentTextRef.current;
      const length = Math.max(oldText.length, newText.length);
      const startChars = oldText.padEnd(length, " ").split("");
      const endChars = newText.padEnd(length, " ").split("");

      queueRef.current = endChars.map((char, i) => {
        const fromChar = startChars[i];
        return {
          targetChar: char,
          targetIndex: MASTER_STRING.indexOf(char) === -1 ? 0 : MASTER_STRING.indexOf(char),
          currentIdxInMaster: MASTER_STRING.indexOf(fromChar) === -1 ? 0 : MASTER_STRING.indexOf(fromChar),
          isFinished: false,
          delay: Math.floor(Math.random() * 10),
        };
      });

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      animate();
    },
    [animate]
  );

  useEffect(() => {
    if (phrases.length === 0) return;

    setText(phrases[0]);

    const id = setInterval(() => {
      phraseIndexRef.current =
        (phraseIndexRef.current + 1) % phrases.length;
      setText(phrases[phraseIndexRef.current]);
    }, interval);

    return () => {
      clearInterval(id);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [phrases, interval, setText]);

  return <span ref={elRef} className={className} />;
};

export default ChromaticGlitch;
