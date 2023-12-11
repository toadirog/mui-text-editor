import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FormatBold, FormatItalic, FormatClear } from '@mui/icons-material';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { SquareIconButton } from './SquareIconButton';

export const CustomTextActions = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = (formatType: TextFormatType) => () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  return (
    <div>
      <SquareIconButton onClick={handleClick('bold')} aria-label="bold">
        <FormatBold />
      </SquareIconButton>
      <SquareIconButton onClick={handleClick('italic')} aria-label="italic">
        <FormatItalic />
      </SquareIconButton>
      <SquareIconButton
        onClick={handleClick('strikethrough')}
        aria-label="format clear"
      >
        <FormatClear />
      </SquareIconButton>
    </div>
  );
};
