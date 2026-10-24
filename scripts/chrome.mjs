// Finds a Chrome/Chromium binary for puppeteer-core (set CHROME to override). GitHub's Ubuntu runners have Chrome installed.
import { existsSync } from 'node:fs';

export function chromePath() {
    const candidates = [
        process.env.CHROME,
        process.env.CHROME_PATH,
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
    ].filter(Boolean);
    const found = candidates.find((p) => existsSync(p));
    if (!found) throw new Error('No Chrome found. Install Google Chrome or set CHROME to the browser binary.');
    return found;
}
