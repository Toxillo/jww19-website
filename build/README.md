The static pages of the website are built using a simple NodeJS script written to be as unfancy as possible. All of the content, templates and metadata in `src` are built and then written into files in `public`.

`build.js` is the main build script. It calls the page-specific build scripts `pages/index.js` and `pages/info.js`. `lib.js` contains useful functions used by both page-specific build scripts.

**NOTE**: _render_ means _turn Mardown into HTML_ in this project.
