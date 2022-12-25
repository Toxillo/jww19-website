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


for (const lang of ['en', 'de']) {
    if (!fs.existsSync(PUBLIC_DIR + lang)) {
        fs.mkdirSync(PUBLIC_DIR + lang);
    }
}
buildIndexPages();
fs.copyFileSync(PUBLIC_DIR + 'de/index.html', PUBLIC_DIR + 'index.html');
buildInfoPages();