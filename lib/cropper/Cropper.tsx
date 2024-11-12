import { useState, useEffect, useRef } from 'react';

type TruncatedTextProps = {
  text: string;
}

export function Cropper({ text }: TruncatedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const spanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spanElement = spanRef.current;

    if (!spanElement) return;

    const updateText = () => {
      const computedStyle = getComputedStyle(spanElement);
      const font = computedStyle.font;
      const maxWidth = spanElement.parentElement?.clientWidth || 0;

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (context) {
        context.font = font;
        let currentText = text;

        if (context.measureText(currentText).width <= maxWidth) {
          setDisplayText(currentText);
          return;
        }

        const words = text.split(' ');

        for (let i = words.length; i > 0; i--) {
          currentText = words.slice(0, i).join(' ') + '...';
          if (context.measureText(currentText).width <= maxWidth) {
            setDisplayText(currentText);
            break;
          }
        }

        if (context.measureText('...').width > maxWidth) {
          setDisplayText('');
        } else if (displayText !== '...') {
          setDisplayText('...');
        }
      }
    };

    updateText();

    const resizeObserver = new ResizeObserver(() => {
      updateText();
    });

    resizeObserver.observe(spanElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return <span ref={spanRef}>{displayText}</span>;
};
