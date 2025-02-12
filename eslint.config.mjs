import shared from '@liquify/eslint-config';

export default [
  {
    ignores: [
      "package/*",
      "index.cjs",
      "index.js",
      "index.d.ts"
    ]
  },
  ...shared,
];
