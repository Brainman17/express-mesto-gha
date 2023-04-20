module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2021": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "no-underscore-dangle": "off"
    }
}
