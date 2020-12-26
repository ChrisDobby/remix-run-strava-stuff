module.exports = {
    purge: process.env.NODE_ENV === "production" ? ["./app/**/*.ts", "./app/**/*.tsx"] : [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            gridTemplateRows: {
                hb: "minmax(0, auto) minmax(0, 1fr)",
                hlb: "minmax(0, auto) minmax(0, 1fr) minmax(0, 50%)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
