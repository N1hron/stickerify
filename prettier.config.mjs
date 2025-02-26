export default {
  trailingComma: 'es5',
  tabWidth: 4,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  printWidth: 100,
  overrides: [
    {
      files: ['*.json', '.*rc'],
      options: {
        trailingComma: 'none',
        singleQuote: false,
        tabWidth: 2,
        quoteProps: 'preserve',
      },
    },
    {
      files: ['*.config.{js,mjs,cjs,ts,mts,cts}'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
