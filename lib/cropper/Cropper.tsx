import { useRef, useEffect, useState, useCallback } from "react";

// Hooks
import {useDebounce} from "../hooks/useDebounce";

// Utils
import {measureText} from "../utils/helpers";

interface TextCropperProps {
  /**
   * The text to be cropped
   */
  text: string;
  /**
   * Optional className for styling
   */
  className?: string;
  /**
   * Optional custom ellipsis string (defaults to "...")
   */
  ellipsis?: string;
  /**
   * Optional default line height multiplier (defaults to 1.2)
   */
  defaultLineHeight?: number;
  /**
   * Optional debounce wait time in ms (defaults to 300)
   */
  debounceWait?: number;
}

export function TextCropper({
  text,
  className = "",
  ellipsis = "...",
  defaultLineHeight = 1.2,
  debounceWait = 300
}: TextCropperProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [croppedText, setCroppedText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>();

  const getOrCreateCanvas = useCallback((): [HTMLCanvasElement, CanvasRenderingContext2D] => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      throw new Error("Cannot get canvas context");
    }
    return [canvasRef.current, context];
  }, []);

  const calculateCroppedText = useCallback(() => {
    const spanElement = spanRef.current;
    if (!spanElement) return;
    
    const parent = spanElement.parentElement;
    if (!parent) return;

    const spanStyle = getComputedStyle(spanElement);
    const parentStyle = getComputedStyle(parent);
    
    // Parse line height
    const lineHeight = spanStyle.lineHeight;
    const numericLineHeight = lineHeight === "normal" 
      ? defaultLineHeight * 16
      : parseFloat(lineHeight);
    
    const maxWidth = parseFloat(parentStyle.width);
    const maxHeight = parseFloat(parentStyle.height);

    // Early return if container is too small
    if (numericLineHeight > maxHeight) {
      setCroppedText("");
      return;
    }

    const [_, context] = getOrCreateCanvas();
    context.font = spanStyle.font;

    // If text fits completely, use it as is
    if (measureText(context, text, maxWidth)) {
      setCroppedText(text);
      return;
    }

    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine: string[] = [];
    const maxLines = Math.floor(maxHeight / numericLineHeight);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentLine.push(word);
      const lineText = currentLine.join(" ");
      
      // Check if current line fits
      if (!measureText(context, lineText, maxWidth)) {
        // Remove the last word since it doesn't fit
        currentLine.pop();
        
        // If we have words in the current line
        if (currentLine.length > 0) {
          // If this is the last allowed line, add ellipsis
          if (lines.length === maxLines - 1) {
            let lineWithEllipsis = currentLine.join(" ") + ellipsis;
            // Try to fit as many characters as possible with ellipsis
            while (!measureText(context, lineWithEllipsis, maxWidth) && currentLine.length > 0) {
              currentLine.pop();
              lineWithEllipsis = currentLine.join(" ") + ellipsis;
            }
            lines.push(lineWithEllipsis);
            break;
          } else {
            // Add the line and start a new one with the current word
            lines.push(currentLine.join(" "));
            currentLine = [word];
          }
        }
      }
      
      // If we're at the last word
      if (i === words.length - 1) {
        const finalLine = currentLine.join(" ");
        if (measureText(context, finalLine, maxWidth)) {
          lines.push(finalLine);
        } else if (lines.length < maxLines) {
          lines.push(finalLine + ellipsis);
        }
      }
    }

    setCroppedText(lines.join("\n"));
  }, [defaultLineHeight, ellipsis, getOrCreateCanvas, text]);

  const debouncedCalculate = useDebounce(calculateCroppedText, debounceWait);

  useEffect(() => {
    const spanElement = spanRef.current;
    if (!spanElement?.parentElement) return;

    const resizeObserver = new ResizeObserver(debouncedCalculate);
    resizeObserver.observe(spanElement.parentElement);

    // Initial calculation
    calculateCroppedText();

    return () => {
      resizeObserver.disconnect();
    };
  }, [debouncedCalculate, calculateCroppedText]);

  return (
    <span ref={spanRef} className={className}>
      {croppedText}
    </span>
  );
}
