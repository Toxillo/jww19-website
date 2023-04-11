/** This file contains useful functions used by multiple build scripts and the configuration for marked. **/

const fs = require("fs");
const {
    marked
} = require("marked");

// configure marked
marked.use({
    renderer: {
        link(href, title, text) {
            title = title ? title : "";
            if (href.endsWith("pdf")) {
				// make links to PDFs open in a new tab
                return `<a class="pdf" href="${href}" target="_blank" title="${title}">${text}</a>`
            } else if (href.startsWith("http")) {
				// make links to external website open in a new tab
                return `<a class="external" href="${href}" target="_blank" title="${title}">${text}</a>`
            } else {
                return `<a class="local" href="${href}" title="${title}">${text}</a>`
            }
        },
        image(href, title, text) {
            title = title ? title : text;
			// add the "lazy" attribute to all images
            return `<img src="${href}" title="${title}" alt="${text}" loading="lazy" />`;
        }
    }
});

/** Parses a markdown file with a specific structure and returns the title and rendered HTML of the English and German section. The structure looks like this:

```md
<!-- English -->
# Example English Title
Some mardown content in English.

<!-- Deutsch -->
# Bespieltitel
Beispielinhalt für ein Markdownfile.
```

(see `src/content` for examples) **/
function parseMultilingualMarkdown(path) {
    let fileContent = fs.readFileSync(path, 'utf-8');
	// The comment indicating the English section can be ignored and removed, since it only serves as a help when editing content.
    fileContent = fileContent.replace('<!-- English -->\n', '');
	// The comment indicating the German section acts as the separator for the two sections.
    let [englishContent, germanContent] = fileContent.split('<!-- Deutsch -->\n');
	// Get the title for the section from the first heading in the section and make everything else the content.
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

/** Takes the paths of a bunch of .css files, concatenates the contents and wraps them in a <style> tag. **/
function bundleStyles(styleFilePaths) {
    let bundledStyles = '<style>';
    for (const filePath of styleFilePaths) {
        bundledStyles += fs.readFileSync(filePath, 'utf-8') + ' '; 
    }
    return bundledStyles + '</style>';
}

const ROOT_DIR = __dirname.replace(/build$/, '');
const GITHUB_ROOT = "https://github.com/Haussprecher-JWW19/jww19-website";

// path constants
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
