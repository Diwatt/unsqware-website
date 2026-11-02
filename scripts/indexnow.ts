// Notifies IndexNow (Bing, DuckDuckGo, Yandex…) after a production deploy.
// Run by `pnpm indexnow`, triggered by .github/workflows/indexnow.yml once
// Vercel reports a successful production deployment.
import { IndexNowSubmitter } from "../src/services/IndexNowSubmitter";

new IndexNowSubmitter()
  .submit(IndexNowSubmitter.PAGES)
  .then((status) => console.log(`indexnow ✓ HTTP ${status} · ${IndexNowSubmitter.PAGES.length} pages`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
