import { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $isTextNode } from 'lexical';
import { $isLinkNode } from '@lexical/link';

const LinkPopoverPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [linkURL, setLinkURL] = useState<string>('');

  useEffect(() => {
    if (!editor) {
      return;
    }

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        console.log(selection);

        if (selection && $isRangeSelection(selection)) {
          const node = selection.focus.getNode();

          // If the focus node is a text node, check its parent for a LinkNode
          if ($isTextNode(node)) {
            const parent = node.getParent();
            if (parent && $isLinkNode(parent)) {
              const domNode = editor.getElementByKey(parent.getKey());
              setAnchorEl(domNode);
              setLinkURL(parent.getURL());
            } else {
              setAnchorEl(null);
              setLinkURL('');
            }
          }
        }
      });
    });
  }, [editor]);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setLinkURL('');
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div>Link: {linkURL}</div>
    </Popover>
  );
};

export default LinkPopoverPlugin;
