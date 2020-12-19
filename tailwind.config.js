module.exports = {
    purge: process.env.NODE_ENV === "production" ? ["./app/**/*.ts", "./app/**/*.tsx"] : [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
