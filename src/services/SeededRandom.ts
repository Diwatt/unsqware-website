/**
 * Deterministic pseudo-random numbers in [0, 1) derived from a text seed
 * (FNV-1a hash + mulberry32): the same seed always yields the same sequence,
 * on the server pre-render and in the browser alike.
 */
export class SeededRandom {
  private state: number;

  constructor(seed: string) {
    this.state = this.hash(seed);
  }

  public next(): number {
    this.state = (this.state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;

    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  }

  private hash(seed: string): number {
    let hash = 0x811c9dc5;
    for (const char of seed) {
      hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193);
    }

    return hash >>> 0;
  }
}
