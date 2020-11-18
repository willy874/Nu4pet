module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    },
    settings: {
        'import/resolver': {
            alias: {
                    map: [
                        ['@', './src/js'],
                        ['@assets', './src/assets'],
                    ],
                    extensions: ['.js'],
            },
        },
    },
};
