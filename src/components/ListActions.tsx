import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isListNode, ListNode } from '@lexical/list';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $getSelection, $isRangeSelection } from 'lexical';

export default function ListActions(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [listType, setListType] = useState<'bullet' | 'number' | null>(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const node = selection.getNodes()[0];

          if (node !== null) {
            let foundListNode = null;

            if ($isListNode(node)) {
              const headingType = node.getListType();
              foundListNode = headingType;
            } else {
              // Traverse up to find a parent heading node if the selection is within a heading
              let parent = node.getParent();

              while (parent !== null) {
                if ($isListNode(parent)) {
                  foundListNode = parent.getListType();
                  break;
                }
                parent = parent.getParent();
              }
            }

            setListType(foundListNode as 'bullet' | 'number' | null);
          }
        }
      });
    });
  }, [editor]);

  const toggleList = (type: 'bullet' | 'number') => {
    if (type === 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (type === 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }

    if (listType === type) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  console.log(listType);

  return (
    <div className="toolbar">
      <IconButton
        color={listType === 'bullet' ? 'primary' : 'default'}
        onClick={() => toggleList('bullet')}
        aria-label="format bulleted list"
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        color={listType === 'number' ? 'primary' : 'default'}
        onClick={() => toggleList('number')}
        aria-label="format numbered list"
      >
        <FormatListNumberedIcon />
      </IconButton>
    </div>
  );
}
