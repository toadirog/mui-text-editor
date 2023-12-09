import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import styled from 'styled-components';

export const ContentEditable = styled(LexicalContentEditable)`
  border: 0;
  font-size: 15px;
  display: block;
  position: relative;
  outline: 0;
  padding: 8px 28px 40px;
  min-height: 150px;
  width: 100%;
`;
