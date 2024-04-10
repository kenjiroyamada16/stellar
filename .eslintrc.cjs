module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
  ],
  rules: {
    eqeqeq: ['error', 'smart'],
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreStrings: true,
        ignorePattern: 'd="([\\s\\S]*?)"',
      },
    ],
    'no-underscore-dangle': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'getters'],
      },
    ],
    'no-plusplus': 'off',
    'no-shadow': [
      'error',
      {
        allow: ['state', 'getters'],
      },
    ],
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'vue/html-button-has-type': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/max-len': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'no-extra-boolean-cast': 'off',
    'no-unused-vars': 'warn',
  },
  globals: {
    defineProps: true,
    defineEmits: true,
    defineExpose: true,
  },
  overrides: [
    {
      files: ['*Icon.vue', '*.test.js'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.jpeg', '.jpg', '.js', '.css', '.png', '.scss', '.svg', '.vue'],
      },
    },
  },
};


