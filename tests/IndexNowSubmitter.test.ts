import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { IndexNowSubmitter } from "../src/services/IndexNowSubmitter";

describe("IndexNowSubmitter.buildPayload", () => {
  it("points the engines to the key file served from the site", () => {
    expect(new IndexNowSubmitter(vi.fn()).buildPayload(IndexNowSubmitter.PAGES)).toStrictEqual({
      host: "unsqware.com",
      key: IndexNowSubmitter.KEY,
      keyLocation: `https://unsqware.com/${IndexNowSubmitter.KEY}.txt`,
      urlList: ["https://unsqware.com/", "https://unsqware.com/en/"],
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
    const status = await new IndexNowSubmitter(fetcher).submit(["https://unsqware.com/"]);

    expect(status).toBe(202);
    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe("https://api.indexnow.org/indexnow");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).urlList).toStrictEqual(["https://unsqware.com/"]);
  });

  it("rejects when IndexNow refuses the submission", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 403 });

    await expect(new IndexNowSubmitter(fetcher).submit(["https://unsqware.com/"])).rejects.toThrow("IndexNow HTTP 403");
  });
});
