import {useRef, useEffect, useState} from "react";

type TruncatedTextProps = {
  text: string;
}

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function(...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function Cropper({ text }: TruncatedTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [croppedText, setCroppedText] = useState<string>('');

  useEffect(() => {
    const spanElement = spanRef.current;
    if (!spanElement) return;
    const parent = spanElement.parentElement;
    if (!parent) return;

    const updateCroppedText = () => {
      const spanComputedStyle = getComputedStyle(spanElement);
      let lineHeight: number | string = spanComputedStyle.lineHeight !== 'normal' ? spanComputedStyle.lineHeight : '1.2'; // Default line-height
      if (typeof lineHeight === 'string' && lineHeight.includes('px')) {
        lineHeight = parseInt(lineHeight);
      } else {
        lineHeight = +(lineHeight) * 16;
      }

      const font = spanComputedStyle.font;
      const parentComputedStyle = getComputedStyle(parent);
      const maxWidth = parseFloat(parentComputedStyle.width);
      const maxHeight = parseFloat(parentComputedStyle.height);

      if (lineHeight > maxHeight) {
        return;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (context) {
        context.font = font;

        if (context.measureText(text).width <= maxWidth) {
          setCroppedText(text);
        }

        const words = text.split(' ');
        let finalWords = words.slice(0, 0);
        let wordIndex = 0;
        let linesCount = 1;
        while (linesCount * lineHeight <= maxHeight) {
          for (let i = wordIndex; i < words.length; i++) {
            const line = words.slice(wordIndex, i).join(' ');
            if (context.measureText(line + '...').width > maxWidth) {
              finalWords = words.slice(0, i - 1);
              wordIndex = i - 1;
              break;
            }
          }
          if (wordIndex === words.length - 1) {
            break;
          }
          linesCount++;
        }

        setCroppedText(finalWords.join(' ') + (finalWords.length === words.length ? '' : '...'));
      }
    }

    const resizeObserver = new ResizeObserver(debounce(updateCroppedText, 300));

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  return <span ref={spanRef}>{croppedText}</span>;
};
