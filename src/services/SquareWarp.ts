// Derives the warped logo square geometry from the scroll position: each
// corner drifts along its own sine wave while the whole square rotates.
// Pure computation, no DOM — the MorphingSquare component only renders it.
export class SquareWarp {
  private static readonly BASE_POINTS: readonly (readonly [number, number])[] = [
    [4, 4],
    [26, 4],
    [26, 26],
    [4, 26],
  ];

  public constructor(private readonly scrollY: number) {}

  public getRotationDeg(): number {
    return Math.sin(this.getTime() * 0.45) * 18;
  }

  public getAmplitude(): number {
    return Math.min(5, 1.5 + this.scrollY / 400);
  }

  public getMainPoints(): string {
    return this.computePoints(this.getTime(), this.getAmplitude(), 0);
  }

  public getEchoPoints(): string {
    return this.computePoints(this.getTime() * 0.8, this.getAmplitude() * 1.3, 2.4);
  }

  private computePoints(time: number, amplitude: number, phase: number): string {
    return SquareWarp.BASE_POINTS.map(([x, y], i) => {
      const k = i * 1.7 + phase;
      const dx = Math.sin(time * (1 + i * 0.23) + k) * amplitude;
      const dy = Math.cos(time * (1.2 - i * 0.17) + k * 1.3) * amplitude;

      return `${(x + dx).toFixed(2)},${(y + dy).toFixed(2)}`;
    }).join(" ");
  }

  // One "time unit" per 180px of scroll drives every oscillation.
  private getTime(): number {
    return this.scrollY / 180;
  }
}
