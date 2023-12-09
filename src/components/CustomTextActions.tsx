import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';

const customTextMap: Record<'B' | 'I' | 'S', TextFormatType> = {
  B: 'bold',
  I: 'italic',
  S: 'strikethrough',
};

const textVariants: Array<keyof typeof customTextMap> = ['B', 'I', 'S'];

export const CustomTextActions = () => {
  const [editor] = useLexicalComposerContext();

  const handleOnClick = (formatType: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  return (
    <div>
      {textVariants.map((value) => {
        return (
          <button onClick={() => handleOnClick(customTextMap[value])}>
            {value}
          </button>
        );
      })}
    </div>
  );
};
