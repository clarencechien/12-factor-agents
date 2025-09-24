document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_OWNER = 'humanlayer';
    const GITHUB_REPO = '12-factor-agents';
    const GITHUB_BRANCH = 'feat/add-beginner-friendly-chinese-guide'; // Or the default branch name

    const navLinksContainer = document.getElementById('nav-links');
    const contentEn = document.getElementById('content-en');
    const contentZh = document.getElementById('content-zh');

    // A simplified mapping for original file names as they are inconsistent
    const enFileMap = {
        1: 'content/factor-01-natural-language-to-tool-calls.md',
        2: 'content/factor-02-own-your-prompts.md',
        3: 'content/factor-03-own-your-context-window.md',
        4: 'content/factor-04-tools-are-structured-outputs.md',
        5: 'content/factor-05-unify-execution-state.md',
        6: 'content/factor-06-launch-pause-resume.md',
        7: 'content/factor-07-contact-humans-with-tools.md',
        8: 'content/factor-08-own-your-control-flow.md',
        9: 'content/factor-09-compact-errors.md',
        10: 'content/factor-10-small-focused-agents.md',
        11: 'content/factor-11-trigger-from-anywhere.md',
        12: 'content/factor-12-stateless-reducer.md',
    };

     const zhFileMap = {
        1: 'content/zh-tw/factor-01-natural-language-to-tool-calls.md',
        2: 'content/zh-tw/factor-02-own-your-prompts.md',
        3: 'content/zh-tw/factor-03-own-your-context-window.md',
        4: 'content/zh-tw/factor-04-tools-are-structured-outputs.md',
        5: 'content/zh-tw/factor-05-unify-execution-state.md',
        6: 'content/zh-tw/factor-06-launch-pause-resume.md',
        7: 'content/zh-tw/factor-07-contact-humans-with-tools.md',
        8: 'content/zh-tw/factor-08-own-your-control-flow.md',
        9: 'content/zh-tw/factor-09-compact-errors.md',
        10: 'content/zh-tw/factor-10-small-focused-agents.md',
        11: 'content/zh-tw/factor-11-trigger-from-anywhere.md',
        12: 'content/zh-tw/factor-12-stateless-reducer.md',
    };


    function buildUrl(path) {
        if (!path) return null;
        return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;
    }

    async function fetchAndRender(path, element) {
        element.innerHTML = 'Loading...';
        const url = buildUrl(path);
        if (!url) {
            element.innerHTML = 'N/A';
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            element.innerHTML = marked.parse(markdown);
        } catch (error) {
            element.innerHTML = `<p style="color: red;">Error loading content: ${error.message}</p>`;
        }
    }

    function loadChapter(enPath, zhPath) {
        fetchAndRender(enPath, contentEn);
        fetchAndRender(zhPath, contentZh);
    }

    function populateNav() {
        // Introduction
        const introLi = document.createElement('li');
        const introLink = document.createElement('a');
        introLink.href = '#intro';
        introLink.textContent = 'Introduction';
        introLink.dataset.enPath = 'README.md';
        introLink.dataset.zhPath = 'README.zh-tw.md';
        introLi.appendChild(introLink);
        navLinksContainer.appendChild(introLi);

        // Intro to Agents (ZH only)
        const zhIntroLi = document.createElement('li');
        const zhIntroLink = document.createElement('a');
        zhIntroLink.href = '#intro-zh';
        zhIntroLink.textContent = 'Intro to Agents (ZH)';
        zhIntroLink.dataset.enPath = "null"; // Using string "null" for dataset
        zhIntroLink.dataset.zhPath = 'content/zh-tw/introduction-to-agents.md';
        zhIntroLi.appendChild(zhIntroLink);
        navLinksContainer.appendChild(zhIntroLi);

        // Factors 1-12
        for (let i = 1; i <= 12; i++) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#factor${i}`;
            link.textContent = `Factor ${i}`;
            link.dataset.enPath = enFileMap[i];
            link.dataset.zhPath = zhFileMap[i];
            li.appendChild(link);
            navLinksContainer.appendChild(li);
        }
    }

    navLinksContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();

            // Active link styling
            document.querySelectorAll('#nav-links a').forEach(a => a.classList.remove('active'));
            e.target.classList.add('active');

            const enPath = e.target.dataset.enPath === "null" ? null : e.target.dataset.enPath;
            const zhPath = e.target.dataset.zhPath;
            loadChapter(enPath, zhPath);
        }
    });

    // Initial load
    populateNav();
    // Activate the first link and load it
    const firstLink = document.querySelector('#nav-links a');
    if (firstLink) {
        firstLink.classList.add('active');
        const enPath = firstLink.dataset.enPath === "null" ? null : firstLink.dataset.enPath;
        const zhPath = firstLink.dataset.zhPath;
        loadChapter(enPath, zhPath);
    }
});
