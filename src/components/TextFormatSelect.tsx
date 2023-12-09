import React, { useState, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingTagType } from '@lexical/rich-text';
import { FORMAT_HEADING_COMMAND } from '../plugins/CustomHeadingPlugin';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $isHeadingNode } from '@lexical/rich-text';

export const TextFormatSelect = () => {
  const [editor] = useLexicalComposerContext();
  const [heading, setHeading] = useState<HeadingTagType | 'text'>('text');

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const node = selection.getNodes()[0];

          if (node !== null) {
            let foundHeading = 'text';

            if ($isHeadingNode(node)) {
              const headingType = node.getTag();
              foundHeading = headingType;
            } else {
              // Traverse up to find a parent heading node if the selection is within a heading
              let parent = node.getParent();

              while (parent !== null) {
                if ($isHeadingNode(parent)) {
                  foundHeading = parent.getTag();
                  break;
                }
                parent = parent.getParent();
              }
            }

            setHeading(foundHeading as HeadingTagType | 'text');
          }
        }
      });
    });
  }, [editor]);

  const handleHeadingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeading = event.target.value as HeadingTagType | 'text';
    setHeading(newHeading);
    editor.dispatchCommand(FORMAT_HEADING_COMMAND, newHeading);
  };

  return (
    <TextField
      select
      value={heading}
      size="small"
      onChange={handleHeadingChange}
      variant="outlined"
      SelectProps={{
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        },
      }}
    >
      {(['h1', 'h2', 'h3'] as Array<HeadingTagType>).map((tag) => (
        <MenuItem key={tag} value={tag}>
          {tag.toUpperCase()}
        </MenuItem>
      ))}
      <MenuItem value="text">Text</MenuItem>
    </TextField>
  );
};
