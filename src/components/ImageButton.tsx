import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { InsertImagePayload } from '../plugins/ImagePlugin';
import { INSERT_IMAGE_COMMAND } from '../plugins/ImagePlugin';
import ImageIcon from '@mui/icons-material/Image';
import { SquareIconButton } from './SquareIconButton';

export default function ImageButton(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <SquareIconButton
      onClick={() =>
        onClick({
          altText: 'Pink flowers',
          src: 'https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200',
        })
      }
      className={'toolbar-item spaced '}
    >
      <ImageIcon />
    </SquareIconButton>
  );
}
