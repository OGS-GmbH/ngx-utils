/* eslint-disable @tseslint/no-non-null-assertion */
import { AfterViewInit, computed, Directive, ElementRef, inject, input, InputSignal, Renderer2, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { animationFrameScheduler, debounceTime, filter, fromEvent, merge, Observable, throttleTime } from 'rxjs';
import { CanvasMeasurerService } from './services/canvas-measurer-service.service';

/**
 * Rounds a number up only if its fractional part is at or above the given threshold.
 *
 * @param value - The value to round.
 * @param threshold - The fractional cutoff (0–1) above which to round up.
 * @returns The rounded integer.
 */
function roundWithThreshold (value: number, threshold: number): number {
  const integerPart: number = Math.floor(value);
  const fraction: number = value - integerPart;

  return fraction >= threshold
    ? Math.ceil(value)
    : integerPart;
}

/**
 * Determines whether a word of a given width fits into the remaining line width,
 * taking into account the ellipsis width on the last line.
 *
 * @param wordWidth - Pixel width of the current word.
 * @param remainingWidth - Remaining pixel width in the current line.
 * @param currentLine - 1-based index of the current line.
 * @param maxLines - Total number of allowed lines.
 * @param ellipsisWidth - Pixel width of the ellipsis string.
 * @returns True if the word can fit, false otherwise.
 */
// eslint-disable-next-line @tseslint/max-params
function fits (
  wordWidth: number,
  remainingWidth: number,
  currentLine: number,
  maxLines: number,
  ellipsisWidth: number
): boolean {
  // If last word reached take ellipsis into account
  if (currentLine === maxLines)
    return wordWidth + ellipsisWidth <= remainingWidth;

  return wordWidth <= remainingWidth;
}

/**
 * Clamps text to its available space and appends a custom ellipsis.
 *
 * @remarks
 * Limits content automatically to the available size of the parent container.
 * Takes Line height into account as well as preserving whole words.
 * Works with changing input in form of signals as well as static input.
 *
 * @example **Template (HTML)**
 * ```html
 * <p
 *   textClamp
 *   [text]="myText()"
 *   [ellipsis]="'… more'"></p>
 * ```
 *
 * @example **Component (TypeScript)**
 * ```ts
 * @Component({
 *   standalone: true,
 *   selector: 'app-foo',
 *   imports: [TextClampDirective]
 * })
 * export class ArticleCardComponent {
 *   protected myText: WritableSignal<string> = signal<string>("...");
 *
 *   protected onMyEvent(): void {
 *    this.myText.set("something else...")
 *   }
 * }
 * ```
 */

@Directive({
  selector: '[textClamp]',
  standalone: true
})
export class TextClampDirective implements AfterViewInit {
  private _isTextInitialized: boolean = false;

  private readonly _renderer: Renderer2 = inject(Renderer2);

  private _htmlElement: ElementRef<HTMLElement> | undefined = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  private get _nativeElement (): HTMLElement | undefined {
    if (this._htmlElement?.nativeElement)
      return this._htmlElement.nativeElement;


    return undefined;
  }

  public text: InputSignal<string | undefined> = input.required();

  public ellipsis: InputSignal<string> = input("...");

  private _textChange$: Observable<string | undefined> = toObservable(this.text);

  private _canvasMeasureService: CanvasMeasurerService = inject(CanvasMeasurerService);

  // eslint-disable-next-line @unicorn/consistent-function-scoping
  private _words: Signal<string[]> = computed(() => {
    let words: string[] = [];

    if (this.text())

      words = this.text()!.split(" ");

    return words;
  });

  ngAfterViewInit (): void {
    const visibility$: Observable<Event> = fromEvent(document, "visibilitychange");
    const focus$: Observable<Event> = fromEvent(window, "focus");
    const resize$: Observable<Event> = fromEvent(window, "resize");
    // Slower throttle for refocus
    // eslint-disable-next-line @tseslint/typedef
    const refocus$ = merge(visibility$, focus$).pipe(throttleTime(500));
    // Fast throttle for change in text or resize
    // eslint-disable-next-line @tseslint/typedef
    const fastChange$ = merge(resize$, this._textChange$).pipe(debounceTime(10));

    merge(refocus$, fastChange$)
      .pipe(
        filter(() => !document.hidden),
        debounceTime(0, animationFrameScheduler)
      )
      .subscribe(() => {
        void this.scheduleEllipsis();
      });
    // Setting initial text
    setTimeout(() => {
      if (this._isTextInitialized)
        void this.scheduleEllipsis();
    }, 0);
  }

  setText (text: string): void {
    if (this._nativeElement)
      this._renderer.setProperty(this._nativeElement, 'textContent', text);
  }

  /**
   * Schedules the ellipsis calculation by waiting for the font to be fully loaded so it can be measured correctly
   */
  private async scheduleEllipsis (): Promise<void> {
    await document.fonts.ready;
    setTimeout(() => {
      if (this._nativeElement && this.text()) {
        // Setting text for the text-container to adjust to its full possible height
        this.setText(this.text()!);

        if (this._nativeElement.clientHeight === this._nativeElement.scrollHeight) return;

        requestAnimationFrame(() => {
          const clampedText: string | undefined = this.getClampedText();

          if (clampedText)
            this.setText(clampedText);
        });
      }
    }, 0);
  }


  /**
   * Calculates the multiline ellipsis by measuring word widths
   * against the available space and line count.
   *
   * @returns clamped text or undefined if measurement went wrong
   */
  getClampedText (): string | undefined {
    if (this._nativeElement && this.text()) {
      if (!this._isTextInitialized)
        this._isTextInitialized = true;


      let clampText: string = "";

      const elementStyle: CSSStyleDeclaration | undefined = getComputedStyle(this._nativeElement);
      const lineHeight: number = Number.parseFloat(elementStyle.lineHeight);
      const lineCount: number = roundWithThreshold(this._nativeElement.clientHeight / lineHeight, 0.9);
      const ellipsisWidth: number | undefined = this._canvasMeasureService.getRenderedStringWidth(elementStyle, ` ${ this.ellipsis() } `);

      if (!ellipsisWidth) return undefined;

      let usedWordsCount: number = 0;
      let linePointer: number = 1;
      let remainingLineWidth: number = this._nativeElement.clientWidth;

      if (lineCount > 0) {
        for (let i: number = 0; i < this._words().length; i++) {
          // eslint-disable-next-line prefer-template
          const word: string = i === 0 ? this._words()[ i ]! : " " + this._words()[ i ]!;
          const wordWidth: number | undefined = this._canvasMeasureService.getRenderedStringWidth(elementStyle, word);

          if (!wordWidth) return undefined;

          // Check if word fits in line
          if (fits(wordWidth, remainingLineWidth, linePointer, lineCount, ellipsisWidth)) {
            clampText += word;
            remainingLineWidth -= wordWidth;
            usedWordsCount++;
            // eslint-disable-next-line @stylistic/ts/brace-style
          }
          // Check if there is a next line
          else if (linePointer < lineCount) {
            linePointer++;
            remainingLineWidth = this._nativeElement.clientWidth;

            // Check if word fits in line
            if (fits(wordWidth, remainingLineWidth, linePointer, lineCount, ellipsisWidth)) {
              clampText += word;
              remainingLineWidth -= wordWidth;
              usedWordsCount++;
            } else
              break;
          } else
            break;
        }


        if (usedWordsCount > 0 && usedWordsCount < this._words().length)
          clampText += this.ellipsis();
      }

      return clampText;
    }

    return undefined;
  }
}

