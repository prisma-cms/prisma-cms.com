
module.exports = {
  stories: [
    // TODO TypeScript 'declare' fields must first be transformed by @babel/plugin-transform-typescript for packages
    '../**/stories/**/*.stories.@(ts|tsx|js|jsx|mdx)',
    '../src/**/stories/**/*.stories.@(ts|tsx|js|jsx|mdx)',
    '../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  // presets: [path.resolve(__dirname, "./next-preset.js")],
};
