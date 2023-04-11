/** This is the build script for the `/<LANG>/index.html` web page. It renders the content from `src/content/pages/index/` to html and builds an index page at `/en/index.html` and `/de/index.html` using the template at `src/templates/page/index.ejs` at and metadata at `src/content/pages/index/meta.json`.**/

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

/** Adds a heading to the rendered html of a section (one markdown file) in the specified language. **/
function renderSection(lang, id, multilingualMarkdown) {
    return `<h1>${multilingualMarkdown[lang].title}</h1>` +
        multilingualMarkdown[lang].renderedBody;
}

/** This function renders the five sections of the index page (TODO: don't hardcode five sections). **/
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

// Read and preprocess required data for the EJS template
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

/** Use the preprocessed data and EJS template to create an index.html for the specified language. 

The `isRoot` flag is used for creating an additional `index.html` file at the root of the publicly served content, since this is what most browser expect. 

TODO: Configure `/index.html` requests to re-route to `/<LANG>/index.html`. **/
function buildIndexPage(lang, isRoot) {
	// Consolidate all the preprocessed data into a single object that can be used by EJS.
    const pageData = {
        ...metadata[lang],
        metaTags: ejs.render(metaTags, {
            ...metadata[lang],
            openGraphImageLink: metadata.openGraphImageLink,
            openGraphType: metadata.openGraphType,
            pageName: metadata.pageName,
            isRoot: isRoot
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
    const outPath = isRoot ?
        PUBLIC_DIR + 'index.html' :
        PUBLIC_DIR + lang + '/index.html';
    fs.writeFileSync(outPath, ejs.render(indexTemplate, pageData), 'utf-8');
}

module.exports = {
    buildIndexPages() {
        buildIndexPage('en');
        buildIndexPage('de');
		// Build an additional index.html file in German at the root.
        buildIndexPage('de', true);
    }
}
