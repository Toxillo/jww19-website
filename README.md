# Website of the Josef-Wirth-Weg 19 dorm

Live at [jww19.de](https://jww19.de/en/index.html)

## Editing the Website
All of the content of our dorm's website is inside of [`src/content/pages`](https://github.com/Haussprecher-JWW19/jww19-website/tree/main/src/content/pages). Currently the entire website consists of only two pages: [`index`](https://github.com/Haussprecher-JWW19/jww19-website/tree/main/src/content/pages/index) and [`info`](https://github.com/Haussprecher-JWW19/jww19-website/tree/main/src/content/pages/info).

To edit the content for either of those pages, you can simply go ahead and edit the [Markdown](https://www.markdowntutorial.com/) file for the topic or section in question. Each Markdown file, representing a topic or section, is split into an English and a German part, which are used to render the website in the respective language:
```markdown
<!-- English -->
# An Example Title
Topic/Section body goes here.

<!-- Deutsch -->
# Ein Beispieltitel
Hier steht der dazugehörige Text.
```

The comments are a necessary separator of the English and German section used to split the file in twain before rendering them.

**NOTE**: Images will be broken in the GitHub website preview of a Markdown file, since they use a URL relative to the built file, not the content file.

## Development
The website is built as minimal and as unfancy as possible. Plain HTML would be the first choice, if it were not for the convenience of having multiple languages side by side in the same Markdown file using a custom build script. Every bit of added fanciness is more of a headache for the next person that needs to maintain this website.

1. ```shell
   npm install
   ```
2. ```shell
   npm run build
   ```
3. ```shell
   npm run dev

Make sure [Node.js](https://nodejs.org) is installed.
