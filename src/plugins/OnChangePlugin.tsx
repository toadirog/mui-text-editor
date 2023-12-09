import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

import { useEffect } from 'react';

/**
 * Removes all inline style attributes from the given HTML string.
 * This function targets style attributes in the format style="..." and removes them.
 *
 * It is specifically designed for processing HTML output from the Lexical editor,
 * and it doesn't affect the functionality within the editor itself,
 * as the required styles are typically defined at the root element level.
 *
 * @param {string} htmlString - The HTML string to process.
 * @returns {string} The processed HTML string without inline styles added by Lexical.
 */
function removeInlineStyles(htmlString: string) {
  return htmlString.replace(/ style="[^"]*"/g, '');
}

export const OnChangePlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener((listener) => {
      console.log('DATA', listener.editorState.toJSON());
      listener.editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        console.log('HTML', removeInlineStyles(htmlString));
      });
    });
  }, [editor]);

  return null;
};
