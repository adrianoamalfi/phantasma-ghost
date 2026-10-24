// Light / dark switch for the documentation page; remembers the choice.
const root = document.documentElement;
const btn = document.getElementById('theme');
const KEY = 'phantasma-docs-theme';
try {
    const saved = localStorage.getItem(KEY);
    if (saved) root.dataset.theme = saved;
} catch {
    /* storage unavailable */
}
btn?.addEventListener('click', () => {
    const dark = (root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')) === 'dark';
    root.dataset.theme = dark ? 'light' : 'dark';
    try {
        localStorage.setItem(KEY, root.dataset.theme);
    } catch {
        /* storage unavailable */
    }
});
