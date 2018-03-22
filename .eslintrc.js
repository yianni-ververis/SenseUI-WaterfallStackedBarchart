module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "warn",
            "tab",
            { "SwitchCase": 1, "ArrayExpression": 1, "ObjectExpression": 1 }
        ],
        "no-console": "off",
        "no-unused-vars": "warn",        
        "no-multi-spaces": "warn",
        // "camelcase": "warn",
        "no-undef-init": 0,
        "no-undefined": 0,
        "no-cond-assign": 0,
    }
};