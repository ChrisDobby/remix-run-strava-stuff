const autoPrefixer = require("autoprefixer");
const tailwindCss = require("tailwindcss");

module.exports = {
    plugins: process.env.NODE_ENV === "production" ? [autoPrefixer, tailwindCss] : [tailwindCss],
};
