const fs = require("fs");
const {
    marked
} = require("marked");

marked.use({
    renderer: {
        link(href, title, text) {
            if (href.endsWith("pdf")) {
                return `<a class="pdf" href="${href}" target="_blank" title="${title}">${text}</a>`
            } else if (href.startsWith("http")) {
                return `<a class="external" href="${href}" target="_blank" title="${title}">${text}</a>`
            } else {
                return `<a class="local" href="${href}" title="${title}">${text}</a>`
            }
        },
        image(href, title, text) {
            return `<img src="${href}" title="${text}" alt="${text}" loading="lazy" />`;
        }
    }
});

function parseMultilingualMarkdown(path) {
    let fileContent = fs.readFileSync(path, 'utf-8');
    fileContent = fileContent.replace('<!-- English -->\n', '');
    let [englishContent, germanContent] = fileContent.split('<!-- Deutsch -->\n');
    const englishTitle = englishContent.match(/^#+ (.*)\n/)[1];
    englishContent = englishContent.replace(/^#.*?\n/, '');
    const germanTitle = germanContent.match(/^#+ (.*)\n/)[1];
    germanContent = germanContent.replace(/^#.*?\n/, '');
    return {
        en: {
            title: englishTitle,
            renderedBody: marked.parse(englishContent)
        },
        de: {
            title: germanTitle,
            renderedBody: marked.parse(germanContent)
        }
    }
}

function bundleStyles(styleFilePaths) {
    let bundledStyles = '<style>';
    for (const filePath of styleFilePaths) {
        bundledStyles += fs.readFileSync(filePath, 'utf-8') + ' '; 
    }
    return bundledStyles + '</style>';
}

const ROOT_DIR = __dirname.replace(/build$/, '');
const GITHUB_ROOT = "https://github.com/Haussprecher-JWW19/jww19-website";

module.exports = {
    SRC_DIR: ROOT_DIR + "src/",
    PAGES_CONTENT_DIR: ROOT_DIR + "src/content/pages/",
    FRAGMENTS_CONTENT_DIR: ROOT_DIR + "src/content/fragments/",
    PAGE_TEMPLATES_DIR: ROOT_DIR + "src/templates/pages/",
    FRAGMENT_TEMPLATES_DIR: ROOT_DIR + "src/templates/fragments/",
    PAGES_STYLES_DIR: ROOT_DIR + "src/styles/pages/",
    FRAGMENT_STYLES_DIR: ROOT_DIR + "src/styles/fragments/",
    PUBLIC_DIR: ROOT_DIR + "public/",
    GITHUB_ROOT: GITHUB_ROOT,
    GITHUB_EDIT_INFO_ROOT: GITHUB_ROOT + '/blob/main/src/content/pages/info/',
    parseMultilingualMarkdown: parseMultilingualMarkdown,
    bundleStyles: bundleStyles
}