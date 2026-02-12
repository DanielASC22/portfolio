import { useEffect, useRef, useCallback } from "react";

const MASTER_STRING =
  " 0123456789.,·-•─~+:;=*π'\"\"┐┌┘└┼├┤┴┬│╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@aàbcdefghijklmnoòpqrstuüvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%()";

interface QueueItem {
  targetChar: string;
  targetIndex: number;
  currentIdxInMaster: number;
  delay: number;
}

/**
 * Monochrome glitch: scrambles text through the master string
 * but renders all characters in foreground color (no chromatic colors).
 */
const MonoGlitch = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const queueRef = useRef<QueueItem[]>([]);
  const frameRef = useRef<number | null>(null);
  const currentTextRef = useRef("");

  const animate = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    let output = "";
    let allFinished = true;

    queueRef.current.forEach((item) => {
      if (item.delay > 0) {
        item.delay--;
        const char = MASTER_STRING[item.currentIdxInMaster] || " ";
        output += char === " " ? "\u00A0" : char;
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
        output += char === " " ? "\u00A0" : char;
      } else {
        output += item.targetChar === " " ? "\u00A0" : item.targetChar;
      }
    });

    el.textContent = output;
    currentTextRef.current = text;

    if (!allFinished) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [text]);

  useEffect(() => {
    const oldText = currentTextRef.current;
    const length = Math.max(oldText.length, text.length);
    const startChars = oldText.padEnd(length, " ").split("");
    const endChars = text.padEnd(length, " ").split("");

    queueRef.current = endChars.map((char, i) => {
      const fromChar = startChars[i];
      return {
        targetChar: char,
        targetIndex:
          MASTER_STRING.indexOf(char) === -1 ? 0 : MASTER_STRING.indexOf(char),
        currentIdxInMaster:
          MASTER_STRING.indexOf(fromChar) === -1
            ? 0
            : MASTER_STRING.indexOf(fromChar),
        delay: Math.floor(Math.random() * 10),
      };
    });

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, animate]);

  return <span ref={elRef} className={className} />;
};

export default MonoGlitch;
