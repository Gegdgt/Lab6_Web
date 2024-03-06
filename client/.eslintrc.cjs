module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-underscore-dangle": 0,
        "arrow-body-style": 0,
        "no-shadow": 0,
        "consistent-return": 0,
        "no-nested-ternary": 0,
        "no-console": 1,
        "no-case-declarations": 0,
        "import/prefer-default-exports": 0
    }
}
