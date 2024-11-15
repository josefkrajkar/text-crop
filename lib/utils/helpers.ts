export const measureText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): boolean => {
  return context.measureText(text).width <= maxWidth;
};
