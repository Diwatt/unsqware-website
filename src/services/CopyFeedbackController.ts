// Owns the "copied ✓" feedback lifecycle: flag on, automatic reset after
// a delay. Keeps the setTimeout/clearTimeout juggling out of the component.
export class CopyFeedbackController {
  public static readonly DEFAULT_RESET_DELAY_MS = 2000;

  private timer: number | undefined;

  constructor(
    // Typically a React state setter; any callback works.
    private readonly setCopied: (copied: boolean) => void,
    private readonly resetDelayMs: number = CopyFeedbackController.DEFAULT_RESET_DELAY_MS,
  ) {}

  // Called right after a successful copy: show the confirmation and
  // (re)schedule the automatic reset, cancelling any pending one.
  public confirm(): void {
    this.setCopied(true);
    this.cancelReset();
    this.timer = window.setTimeout(() => this.setCopied(false), this.resetDelayMs);
  }

  // Cancels a pending reset; call on unmount so the timer never fires
  // on an unmounted component.
  public dispose(): void {
    this.cancelReset();
  }

  private cancelReset(): void {
    if (this.timer !== undefined) {
      window.clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
}
