// Fetch-compatible function, injectable for tests.
type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

/**
 * Tells IndexNow-compatible search engines (Bing, and through it DuckDuckGo,
 * Yandex, Seznam…) that the site's pages changed, right after a production
 * deploy. Google does not take part: it relies on the sitemap.
 */
export class IndexNowSubmitter {
  public static readonly ENDPOINT = "https://api.indexnow.org/indexnow";
  public static readonly HOST = "unsqwa.re";
  // Public by design: the same value is served at /<KEY>.txt to prove ownership.
  public static readonly KEY = "d92643ec3cf30c2574b25f8093c07edc";
  public static readonly PAGES = ["https://unsqwa.re/", "https://unsqwa.re/en/"];

  constructor(private readonly fetcher: Fetcher = fetch) {}

  public buildPayload(urls: string[]): { host: string; key: string; keyLocation: string; urlList: string[] } {
    return {
      host: IndexNowSubmitter.HOST,
      key: IndexNowSubmitter.KEY,
      keyLocation: `https://${IndexNowSubmitter.HOST}/${IndexNowSubmitter.KEY}.txt`,
      urlList: urls,
    };
  }

  // Resolves to the HTTP status (200 or 202 when accepted).
  // @throws Error when IndexNow rejects the submission.
  public async submit(urls: string[]): Promise<number> {
    const response = await this.fetcher(IndexNowSubmitter.ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(this.buildPayload(urls)),
    });
    if (!response.ok) throw new Error(`IndexNow HTTP ${response.status}`);

    return response.status;
  }
}
