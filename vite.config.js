import path from "path";

export default {
    test: {
        globals: true,
    },
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "./src/api"),
        },
    },
};
