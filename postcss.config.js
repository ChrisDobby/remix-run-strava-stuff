const autoPrefixer = require("autoprefixer");
const tailwindCss = require("tailwindcss");
const postCssImport = require("postcss-import");

const plugins = [tailwindCss, postCssImport];
module.exports = {
    plugins: process.env.NODE_ENV === "production" ? [autoPrefixer, ...plugins] : plugins,
};
