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
buildInfoPages();