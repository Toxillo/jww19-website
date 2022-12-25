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
    GITHUB_ROOT
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
const landing = parseMultilingualMarkdown(INDEX_CONTENT_DIR + 'landing.md');
const langToggle = JSON.parse(fs.readFileSync(FRAGMENTS_CONTENT_DIR + 'lang-toggle/meta.json', 'utf-8'));

function buildIndexPage(lang) {
    const pageData = {
        ...metadata[lang],
        internalCSS: '<style>' +
            fs.readFileSync(PAGES_STYLES_DIR + 'index.css', 'utf-8') +
            ' ' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'lang-toggle.css', 'utf-8') +
            ' ' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'footer.css', 'utf-8') +
            ' ' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'content.css', 'utf-8') +
            '</style>',
        langToggle: ejs.render(fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'lang-toggle.ejs', 'utf-8'), {
            ...langToggle[lang],
            pageName: metadata.pageName
        }),
        landingText: landing[lang].renderedBody,
        content: renderContent(lang),
        footer: ejs.render(
            fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'footer.ejs', 'utf-8'), {
                githubLink: GITHUB_ROOT
            }
        )
    }
    fs.writeFileSync(
        PUBLIC_DIR + lang + '/index.html',
        ejs.render(
            fs.readFileSync(PAGE_TEMPLATES_DIR + 'index.ejs', 'utf-8'), pageData
        ),
        'utf-8'
    );
}

module.exports = {
    buildIndexPages() {
        buildIndexPage('en');
        buildIndexPage('de');
    }
}