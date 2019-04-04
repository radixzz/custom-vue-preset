module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'comma-dangle': ['off'],
    'padded-blocks': 0,
    'no-unused-vars': ['warn'],
    'no-param-reassign': [ 'off' ],
    'no-undef': ['warn'],
    'quotes': ['off'],
    'max-len': ['off'],
    'semi': ['off', 'always'],
    'space-before-blocks': ['off'],
    'space-before-function-paren': ['off'],
    'camelcase': ['warn'],
    'comma-style': ['warn', 'last'],
    'spaced-comment': ['off'],
    'indent': [1, 4, {
      'SwitchCase': 1
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  globals: {
    App: true,
    document: true,
    window: true,
    TweenMax: true,
    TweenLite: true,
    TimelineMax: true,
    Sine: true,
    Power1: true,
    Power2: true,
    Power3: true,
    Power4: true,
    Back: true,
    Elastic: true,
    Linear: true,
    FB: true,
    twttr: true,
    gapi: true,
    requestAnimationFrame: true
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
};
