export const reduceContentComponents = function (components, text = '') {
  // let text = "";

  // console.log(chalk.green("components"), JSON.stringify(components, true, 2));

  if (components && components.length) {
    components.map((n) => {
      const { component, props, components: itemComponents } = n || {}

      const { tag, text: componentText, content } = props || {}

      const {
        blocks,
        // entityMap: contentEntityMap,
      } = content || {}

      if (blocks && blocks.length) {
        // resourceBlocks = resourceBlocks.concat(blocks);

        blocks.map((block) => {
          const { text: blockText } = block

          // textLength += text ? text.length : 0;

          // resourceBlocks.push(block);

          if (blockText) {
            if (text) {
              text += '\n'
            }

            text += blockText
          }

          return null
        })
      }

      // console.log(chalk.green("props"), JSON.stringify(props, true, 2));

      // console.log(chalk.green("component"), component);
      // console.log(chalk.green("tag"), tag);

      if (componentText && typeof componentText === 'string') {
        text += componentText
      } else if (
        component === 'HtmlTag' &&
        ['div', 'p', 'br'].indexOf(tag) !== -1 &&
        text
      ) {
        text += '\n'
      }

      text = reduceContentComponents(itemComponents, text)

      return null
    })
  }

  return text
}
