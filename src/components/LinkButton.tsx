import { useState } from 'react';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LinkIcon from '@mui/icons-material/Link';
import { SquareIconButton } from './SquareIconButton';
import { $createTextNode, $getSelection, $isRangeSelection } from 'lexical';
import { $createLinkNode } from '@lexical/link';

export default function LinkButton(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [url, setUrl] = useState('');

  const handleClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        // Get the anchor node (where the caret is)
        const anchorNode = selection.anchor.getNode();

        // Use Lexical to find the corresponding DOM element
        const domNode = editor.getElementByKey(anchorNode.getKey());
        console.log(domNode);

        if (domNode) {
          setAnchorEl(domNode);
        }
      }
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInsertLink = () => {
    if (url) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) && !selection.isCollapsed()) {
          const text = selection.getTextContent();
          const textNode = $createTextNode(text);
          const linkNode = $createLinkNode(url);
          linkNode.append(textNode);
          selection.insertNodes([linkNode]);
        }
      });
      setUrl('');
      handleClose();
    }
  };

  return (
    <>
      <SquareIconButton
        onClick={handleClick}
        className={'toolbar-item spaced '}
      >
        <LinkIcon />
      </SquareIconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{ padding: 16 }}>
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="Insert link"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button onClick={handleInsertLink} color="primary">
            Insert
          </Button>
        </div>
      </Popover>
    </>
  );
}
