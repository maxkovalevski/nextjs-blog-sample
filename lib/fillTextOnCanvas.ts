import { CanvasRenderingContext2D } from 'canvas';

export const fillTextOnCanvas = (
  context: CanvasRenderingContext2D, 
  text: string, 
  x: number, 
  y: number, 
  maxWidth: number, 
  lineHeight: number
) => {
    const words = text.split(' ');
    let currentLine = '';
    let currentY = y;

    words.forEach((word: string) => {
        const testLine = currentLine + word + ' ';
        const { width: testWidth } = context.measureText(testLine);

        if (testWidth > maxWidth) {
            context.fillText(currentLine, x, currentY);
            currentY += lineHeight;
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    });
    context.fillText(currentLine, x, currentY);
}
