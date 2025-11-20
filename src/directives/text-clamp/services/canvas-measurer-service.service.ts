import { Injectable } from '@angular/core';

/**
 * Builds a CSS font shorthand string from a computed style declaration.
 *
 * @param elementStyle - The computed CSS style of an element, containing font properties.
 * @param options.isFontKey - If true, includes letter-spacing in the resulting string for use as a cache key.
 * @returns A font shorthand string suitable for CanvasRenderingContext2D.font or as a unique font key.
 */
function getFontString (elementStyle: CSSStyleDeclaration, options: { isFontKey: boolean; } | undefined = undefined): string {
  let fontString: string = `${ elementStyle.fontStyle } ${ elementStyle.fontVariant } ${ elementStyle.fontWeight } ${ elementStyle.fontSize }/${ elementStyle.lineHeight } ${ elementStyle.fontFamily }`;

  if (options?.isFontKey) {
    fontString += elementStyle.letterSpacing;
    fontString.trim();
  }

  return fontString;
}

@Injectable({
  providedIn: 'root'
})
export class CanvasMeasurerService {
  private _canvas: HTMLCanvasElement | undefined;

  private get canvas (): HTMLCanvasElement {
    if (this._canvas) return this._canvas;

    this._canvas = document.createElement("canvas");

    return this._canvas;
  }

  private _canvasContext: CanvasRenderingContext2D | null = this.canvas.getContext("2d");

  // Map of maps where each child-map represents a font and each child-map-entry is a string with the measured width
  private _stringWidthCache: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();

  /**
   * Measures text width for a given element style and string,
   * caching results per font configuration.
   *
   * @param style - Computed CSS style of the element (font info).
   * @param text - The string to measure.
   * @returns The width in pixels, or undefined if measurement failed.
   */
  public getRenderedStringWidth (elementStyle: CSSStyleDeclaration | undefined, stringToMeasure: string): number | undefined {
    if (!elementStyle) return undefined;

    const fontString: string = getFontString(elementStyle, { isFontKey: true });

    let fontMap: Map<string, number> | undefined = this._stringWidthCache.get(fontString);

    if (!fontMap) {
      fontMap = new Map<string, number>();
      this._stringWidthCache.set(fontString, fontMap);
    }

    let width: number | undefined = fontMap.get(stringToMeasure);

    if (width) return width;


    if (this._canvasContext) {
      this.setCanvasFont(elementStyle);
      width = this._canvasContext.measureText(stringToMeasure).width;
      fontMap.set(stringToMeasure, width);

      return width;
    }

    return undefined;
  }

  private setCanvasFont (elementStyle: CSSStyleDeclaration): void {
    if (this._canvasContext?.font) {
      const fontString: string = getFontString(elementStyle);

      if (this._canvasContext.font === fontString && this._canvasContext.letterSpacing === elementStyle.letterSpacing) return;

      this._canvasContext.font = fontString;
      this._canvasContext.letterSpacing = elementStyle.letterSpacing;
    }
  }
}
