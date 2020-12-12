const path = require('path');
// const ReactDocgenTypescriptPlugin = require("react-docgen-typescript-plugin").default;


module.exports = ({ config }) => {

  // https://github.com/storybookjs/storybook/issues/11639#issuecomment-689835701
  // Указываем корень проекта для абсолютных путей
  config.resolve.modules = [
    path.resolve(__dirname, ".."),
    path.resolve(__dirname, '../packages/apollo-cms/'),
    path.resolve(__dirname, '../packages/@prisma-cms/*'),
    "node_modules",
  ];


  config.module.rules.push({
    test: /\.(s*)css$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, ".."),
  });

  // console.log('config.plugins', config.plugins);

  // config.plugins.push(new ReactDocgenTypescriptPlugin({ tsconfigPath: "../tscdsdsonfig.json" }));

  return config
}
