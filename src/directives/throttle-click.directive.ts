import { Directive, ElementRef, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime } from 'rxjs';

/**
 * Throttles click events on an HTML element.
 *
 * @category Directives
 * @remarks
 * Prevents rapid repeated clicks by allowing only one `(throttleClick)` event
 * to fire within the configured interval. Works with any clickable element.
 *
 * @example **Template (HTML)**
 * ```html
 * <button
 *   (throttleClick)="onCounterClick($event)"
 *   [throttleTimeMs]="300">
 *  Counter
 * </button>
 * ```
 *
 * @example **Component (TypeScript)**
 * ```ts
 * @Component({
 *   standalone: true,
 *   selector: 'app-foo',
 *   imports: [ThrottleClickDirective]
 * })
 * export class FooComponent {
 *   onCounterClick(mouseEvent: MouseEvent): void {
 *     // ...
 *   }
 * }
 * ```
 * @since 1.2.0
 * @author Ian Wenneckers
 */
@Directive({
  selector: '[throttleClick]',
  standalone: true
})
export class ThrottleClickDirective {
  private readonly _element: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Whether the first click is emitted - default is true
   * @remarks
   * @defaultValue true
   */
  public leading: InputSignal<boolean> = input(true);

  /**
   * Whether the last click is emitted - default is true
   * @remarks
   * @defaultValue true
   */
  public trailing: InputSignal<boolean> = input(true);

  /**
   * Duration of the throttle period in milliseconds.
   * @remarks
   * This value configures the timing used by the directive's throttling mechanism
   * @defaultValue 800
   */
  public throttleTimeMs: InputSignal<number> = input(800);

  @Output() public readonly throttleClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor () {
    fromEvent<MouseEvent>(this._element.nativeElement, "click")
      .pipe(
        throttleTime(this.throttleTimeMs(), undefined, {
          leading: this.leading(),
          trailing: this.trailing()
        }),
        takeUntilDestroyed()
      )
      .subscribe((mouseEvent: MouseEvent) => {
        this.throttleClick.emit(mouseEvent);
      });
  }
}
