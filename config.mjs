// Convert strings to PascalCase by capitalizing first letter of the string.
// Token nodes beyond the first group will already be capitalized.
function toPascalCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Custom file object for compose/object use.
// Generates a unique file for each top-level token category
// and adds required class and package names.
function generateComposeFiles(categories) {
    return categories.map((category) => {
        const pascalCategory = toPascalCase(category);
        const className = `${pascalCategory}Tokens`;
        return {
            destination: `${className}.kt`,
            format: "compose/object",
            filter: (token) =>
                token.path[0] === category && token.$type !== "font-family",
            options: {
                className,
                packageName: "org.jellyfin.design.token",
                showFileHeader: false,
            },
        };
    });
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
                ...generateComposeFiles([
                    "color",
                    "space",
                    "typography",
                    "radius",
                ]),
            ],
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
