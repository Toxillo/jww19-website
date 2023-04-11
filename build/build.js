/** This is the main script for building the static html pages. **/

const fs = require("fs");
const {
    PUBLIC_DIR
} = require("./lib");
const {
    buildIndexPages
} = require("./pages/index");
const {
    buildInfoPages
} = require("./pages/info");

// Create a subdirectory for each language in `public`, if they don't exist yet.
for (const lang of ['en', 'de']) {
    if (!fs.existsSync(PUBLIC_DIR + lang)) {
        fs.mkdirSync(PUBLIC_DIR + lang);
    }
}

// Call the page-specific build scripts (currently there are only 2).
buildIndexPages();
buildInfoPages();
