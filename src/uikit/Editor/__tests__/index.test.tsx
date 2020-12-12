import React from 'react'
import { render } from 'src/tests/utils'
import Component from '..'

describe('Editor', () => {
  it('Render Editor with undefined value', () => {
    const editorKey = 'test-editor'

    const tree = render(<Component editorKey={editorKey} value={undefined} />)

    expect(tree.container).toMatchSnapshot()

    const node = tree.container.children[0]

    /**
     * Should not be rendered Editor
     */
    expect(node).toBeUndefined()
  })

  // it('Render Editor with undefined value', () => {

  //   const editorKey = "test-editor";
  //   const contentStr = "Test content";

  //   const tree = render(<Component
  //     editorKey={editorKey}
  //     value={undefined}
  //   />)

  //   expect(tree.container).toMatchSnapshot()

  //   const node = tree.container.children[0]

  //   /**
  //    * Check editorKey
  //    */
  //   expect(node.querySelector("[data-editor]")?.attributes.getNamedItem("data-editor")?.value).toBe(editorKey);

  //   /**
  //    * Check content
  //    */
  //   expect(node.querySelector("[data-text=true]")?.innerHTML).toBe(contentStr);
  // })
})
