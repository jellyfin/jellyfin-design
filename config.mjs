import { formats } from "style-dictionary/enums";

const { composeObject } = formats;

function generateComposeFiles(categories) {
    return categories.map((category) => ({
        destination: `${category}Tokens.kt`,
        format: composeObject,
        filter: (token) => token.path[0] === category,
        options: {
            className: `${category}Tokens`,
            packageName: 'org.jellyfin.design.tokens',
            showFileHeader: false
        }
    }));
}

export default {
    source: ["tokens/**/*.json"],
    platforms: {
        css: {
            transformGroup: "css",
            prefix: "jf",
            transforms: ["fontFamily/css"],
            buildPath: "dist/css/",
            files: [
                {
                    destination: "_variables.css",
                    format: "css/variables",
                    options: {
                        selector: "html",
                    },
                },
            ],
        },
        scss: {
            transformGroup: "scss",
            prefix: "jf",
            transforms: ["fontFamily/css"],
            buildPath: "dist/scss/",
            files: [
                {
                    destination: "_variables.scss",
                    format: "scss/variables",
                },
            ],
        },
        compose: {
            transformGroup: "compose",
            buildPath: "dist/compose/",
            files: [
                ...generateComposeFiles(["color", "space", "typography", "radius"]),
            ]
        },
        "react-native": {
            transformGroup: "react-native",
            prefix: "jf",
            buildPath: "dist/react-native/",
            files: [
                {
                    destination: "variables.js",
                    format: "javascript/es6",
                },
            ],
        },
    },
};
