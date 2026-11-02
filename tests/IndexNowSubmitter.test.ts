import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { IndexNowSubmitter } from "../src/services/IndexNowSubmitter";

describe("IndexNowSubmitter.buildPayload", () => {
  it("points the engines to the key file served from the site", () => {
    expect(new IndexNowSubmitter(vi.fn()).buildPayload(IndexNowSubmitter.PAGES)).toStrictEqual({
      host: "unsqwa.re",
      key: IndexNowSubmitter.KEY,
      keyLocation: `https://unsqwa.re/${IndexNowSubmitter.KEY}.txt`,
      urlList: ["https://unsqwa.re/", "https://unsqwa.re/en/"],
    });
  });

  it("matches the key file published in public/", async () => {
    const file = await readFile(path.join(process.cwd(), "public", `${IndexNowSubmitter.KEY}.txt`), "utf8");

    expect(file.trim()).toBe(IndexNowSubmitter.KEY);
  });
});

describe("IndexNowSubmitter.submit", () => {
  it("posts the payload as JSON and resolves to the HTTP status", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, status: 202 });
    const status = await new IndexNowSubmitter(fetcher).submit(["https://unsqwa.re/"]);

    expect(status).toBe(202);
    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe("https://api.indexnow.org/indexnow");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).urlList).toStrictEqual(["https://unsqwa.re/"]);
  });

  it("rejects when IndexNow refuses the submission", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 403 });

    await expect(new IndexNowSubmitter(fetcher).submit(["https://unsqwa.re/"])).rejects.toThrow("IndexNow HTTP 403");
  });
});
