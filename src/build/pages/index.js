const fs = require("fs");
const ejs = require("ejs");
const {
    parseMultilingualMarkdown,
    PUBLIC_DIR,
    PAGES_CONTENT_DIR,
    PAGE_TEMPLATES_DIR,
    FRAGMENTS_CONTENT_DIR,
    FRAGMENT_TEMPLATES_DIR,
    FRAGMENT_STYLES_DIR,
    PAGES_STYLES_DIR,
    GITHUB_ROOT,
    bundleStyles
} = require("../lib");

const INDEX_CONTENT_DIR = PAGES_CONTENT_DIR + 'index/';

function renderSection(lang, id, multilingualMarkdown) {
    return `<h1>${multilingualMarkdown[lang].title}</h1>` +
        multilingualMarkdown[lang].renderedBody;
}

function renderContent(lang) {
    return {
        placeToStay: renderSection(
            lang,
            'place-to-stay',
            parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'place-to-stay.md')
        ),
        about: renderSection(
            lang,
            'about',
            parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'about.md')
        ),
        info: renderSection(
            lang,
            'info',
            parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'info.md')
        ),
        contactUs: renderSection(
            lang,
            'contact',
            parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'contact.md')
        ),
        events: renderSection(
            lang,
            'events',
            parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'events.md')
        )
    }
}

const metadata = JSON.parse(fs.readFileSync(INDEX_CONTENT_DIR + 'meta.json', 'utf-8'));
const metaTags = fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'metaTags.ejs', 'utf-8');
const internalCSS = bundleStyles([
    FRAGMENT_STYLES_DIR + 'lang-toggle.css',
    FRAGMENT_STYLES_DIR + 'content.css',
    FRAGMENT_STYLES_DIR + 'footer.css',
    PAGES_STYLES_DIR + 'index.css'
]);
const langToggleTemplate = fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'lang-toggle.ejs', 'utf-8');
const langToggleData = JSON.parse(fs.readFileSync(FRAGMENTS_CONTENT_DIR + 'lang-toggle/meta.json', 'utf-8'));
const landing = parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'landing.md');
const footerTemplate = fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'footer.ejs', 'utf-8');
const indexTemplate = fs.readFileSync(PAGE_TEMPLATES_DIR + 'index.ejs', 'utf-8');

function buildIndexPage(lang) {
    const pageData = {
        ...metadata[lang],
        metaTags: ejs.render(metaTags, {
            ...metadata[lang],
            openGraphImageLink: metadata.openGraphImageLink
        }),
        internalCSS: internalCSS,
        langToggle: ejs.render(langToggleTemplate, {
            ...langToggleData[lang],
            pageName: metadata.pageName
        }),
        landingText: landing[lang].renderedBody,
        content: renderContent(lang),
        footer: ejs.render(footerTemplate, {
            githubLink: GITHUB_ROOT
        })
    }
    fs.writeFileSync(
        PUBLIC_DIR + lang + '/index.html',
        ejs.render(indexTemplate, pageData),
        'utf-8'
    );
}

module.exports = {
    buildIndexPages() {
        buildIndexPage('en');
        buildIndexPage('de');
    }
}