// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "ignorePatterns": [
        "temp.js",
        "**/vendor/*.js",
        "config",
        "node_modules",
        "public",
        "server",
        "scripts",
        "test",
        "jestGlobalSetup.js",
        "**/SlateEditor/**"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": "off",
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/prop-types": "off"
    },
    "globals": {
        "process": "readonly"
    }
}
