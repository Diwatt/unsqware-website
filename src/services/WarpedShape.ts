// Generates a randomly warped quadrilateral clip-path for the section
// tags: a square whose four corners are jittered within the bounds of
// the original hand-drawn shapes. The random source is injectable for tests.
export class WarpedShape {
  private static readonly MAX_X_JITTER = 5;
  private static readonly MAX_Y_JITTER = 14;
  private static readonly CORNERS: readonly (readonly [number, number])[] = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
  ];

  public constructor(private readonly random: () => number = Math.random) {}

  public getClipPath(): string {
    const points = WarpedShape.CORNERS.map(([x, y]) => [
      this.clamp(x + this.jitter(WarpedShape.MAX_X_JITTER)),
      this.clamp(y + this.jitter(WarpedShape.MAX_Y_JITTER)),
    ]);

    return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;
  }

  private jitter(max: number): number {
    return (this.random() * 2 - 1) * max;
  }

  private clamp(value: number): number {
    return Math.min(100, Math.max(0, Math.round(value)));
  }
}
