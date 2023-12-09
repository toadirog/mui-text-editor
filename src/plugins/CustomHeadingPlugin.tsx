import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  createCommand,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  $createParagraphNode,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';

export const FORMAT_HEADING_COMMAND = createCommand('FORMAT_HEADING_COMMAND');

export const CustomHeadingPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand<HeadingTagType | 'text'>(
      FORMAT_HEADING_COMMAND,
      (payload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () =>
            payload === 'text'
              ? $createParagraphNode()
              : $createHeadingNode(payload)
          );
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, []);

  return null;
};
