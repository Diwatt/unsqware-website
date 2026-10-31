import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CopyFeedbackController } from "../src/services/CopyFeedbackController";

describe("CopyFeedbackController", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("sets the flag to true then back to false after the delay", () => {
    const setCopied = vi.fn();
    const controller = new CopyFeedbackController(setCopied, 2000);

    controller.confirm();
    expect(setCopied).toHaveBeenCalledWith(true);

    vi.advanceTimersByTime(1999);
    expect(setCopied).not.toHaveBeenCalledWith(false);
    vi.advanceTimersByTime(1);
    expect(setCopied).toHaveBeenCalledWith(false);
  });

  it("cancels the pending reset when confirming again", () => {
    const setCopied = vi.fn();
    const controller = new CopyFeedbackController(setCopied, 2000);

    controller.confirm();
    vi.advanceTimersByTime(1500);
    controller.confirm();
    // The first timer (500 ms remaining) must not fire.
    vi.advanceTimersByTime(500);
    expect(setCopied).not.toHaveBeenCalledWith(false);

    vi.advanceTimersByTime(1500);
    expect(setCopied).toHaveBeenNthCalledWith(3, false);
  });

  it("dispose() cancels the pending reset", () => {
    const setCopied = vi.fn();
    const controller = new CopyFeedbackController(setCopied, 2000);

    controller.confirm();
    controller.dispose();
    vi.advanceTimersByTime(10_000);

    expect(setCopied).toHaveBeenCalledTimes(1);
    expect(setCopied).toHaveBeenCalledWith(true);
  });

  it("uses the class default delay when none is passed", () => {
    const setCopied = vi.fn();
    const controller = new CopyFeedbackController(setCopied);

    controller.confirm();
    vi.advanceTimersByTime(CopyFeedbackController.DEFAULT_RESET_DELAY_MS - 1);
    expect(setCopied).not.toHaveBeenCalledWith(false);
    vi.advanceTimersByTime(1);
    expect(setCopied).toHaveBeenCalledWith(false);
  });
});
