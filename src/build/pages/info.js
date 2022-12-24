const fs = require("fs");
const ejs = require("ejs");
const {
    parseMultilingualMarkdown,
    PUBLIC_DIR,
    PAGES_CONTENT_DIR,
    FRAGMENT_TEMPLATES_DIR,
    PAGE_TEMPLATES_DIR,
    FRAGMENTS_CONTENT_DIR,
    PAGES_STYLES_DIR,
    FRAGMENT_STYLES_DIR,
    GITHUB_EDIT_INFO_ROOT
} = require("../lib");

const INFO_CONTENT_DIR = PAGES_CONTENT_DIR + 'info/';

function renderContent(lang) {
    let renderedSections = '';
    for (const sectionDir of fs.readdirSync(INFO_CONTENT_DIR)) {
        if (fs.lstatSync(INFO_CONTENT_DIR + '/' + sectionDir).isDirectory()) {
            renderedSections += renderContentSection(sectionDir, lang);
        }
    }
    return renderedSections;
}

function renderPageIndex(lang) {
    let renderedPageIndex = '';
    for (const sectionDir of fs.readdirSync(INFO_CONTENT_DIR)) {
        if (fs.lstatSync(INFO_CONTENT_DIR + '/' + sectionDir).isDirectory() && sectionDir !== 'a-landing') {
            const section = parseMultilingualMarkdown(INFO_CONTENT_DIR + sectionDir + '.md');
            renderedPageIndex += `<h1><a href="#${sectionDir}" class="index-entry">${section[lang].title}</a></h1><ul>`;
            for (const topicFile of fs.readdirSync(INFO_CONTENT_DIR + sectionDir)) {
                const topic = parseMultilingualMarkdown(INFO_CONTENT_DIR + sectionDir + "/" + topicFile);
                const topicID = topicFile.replace(/\.md$/, '');
                renderedPageIndex += `<li><a href="#${topicID}" class="index-entry">${topic[lang].title}</a></li>`;
            }
            renderedPageIndex += '</ul>';
        }
    }
    return renderedPageIndex;
}

function renderContentSection(sectionDir, lang) {
    const sectionContent = parseMultilingualMarkdown(INFO_CONTENT_DIR + sectionDir + '.md');
    const sectionID = sectionDir;
    let renderedSection = `<section id="${sectionID}"><h1>${sectionContent[lang].title}</h1><div>${sectionContent[lang].renderedBody}</div>`;
    for (const topicFile of fs.readdirSync(INFO_CONTENT_DIR + sectionDir)) {
        renderedSection += renderTopic(INFO_CONTENT_DIR + sectionDir, topicFile, lang);
    }
    renderedSection += '</section>';
    return renderedSection;
}

const topicTemplate = fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'topic.ejs', 'utf-8');

function renderTopic(parentDir, topicFile, lang) {
    const topic = parseMultilingualMarkdown(parentDir + '/' + topicFile);
    const topicID = topicFile.replace(/\.md$/, '');
    return ejs.render(topicTemplate, {
        topicID: topicID,
        title: topic[lang].title,
        body: topic[lang].renderedBody,
        editLink: GITHUB_EDIT_INFO_ROOT + parentDir + '/' + topicFile,
        editButtonText: metadata[lang].editButtonText
    });
}

const metadata = JSON.parse(fs.readFileSync(INFO_CONTENT_DIR + 'meta.json', 'utf-8'));
const langToggle = JSON.parse(fs.readFileSync(FRAGMENTS_CONTENT_DIR + 'lang-toggle/meta.json', 'utf-8'));

const internalCSS = '<style>' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'footer.css', 'utf-8') +
            ' ' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'lang-toggle.css', 'utf-8') +
            ' ' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'topic.css', 'utf-8') +
            ' ' +
            fs.readFileSync(FRAGMENT_STYLES_DIR + 'content.css', 'utf-8') +
            ' ' +
            fs.readFileSync(PAGES_STYLES_DIR + 'info.css', 'utf-8') +
            '</style>'

function buildInfoPage(lang) {
    const pageData = {
        ...metadata[lang],
        internalCSS: internalCSS,
        langToggle: ejs.render(fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'lang-toggle.ejs', 'utf-8'), {
            ...langToggle[lang],
            pageName: metadata.pageName
        }),
        pageIndex: renderPageIndex(lang),
        content: renderContent(lang),
        footer: fs.readFileSync(FRAGMENT_TEMPLATES_DIR + 'footer.ejs')
    };

    fs.writeFileSync(
        PUBLIC_DIR + lang + '/info.html',
        ejs.render(
            fs.readFileSync(PAGE_TEMPLATES_DIR + 'info.ejs', 'utf-8'),
            pageData
        ),
        'utf-8'
    );
}

module.exports = {
    buildInfoPages() {
        buildInfoPage('en');
        buildInfoPage('de');
    }
}