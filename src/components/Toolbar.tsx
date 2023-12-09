import styled from 'styled-components';
import { TextFormatSelect } from './TextFormatSelect';
import { CustomTextActions } from './CustomTextActions';
import ImageToolbar from './ImageToolbar';
import ListActions from './ListActions';

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 8px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(0deg, #f5f5f5, #f5f5f5),
    linear-gradient(0deg, #e0e0e0, #e0e0e0);
`;

export const Toolbar = () => {
  return (
    <ToolbarContainer>
      <TextFormatSelect />
      <CustomTextActions />
      <ListActions />
      <ImageToolbar />
    </ToolbarContainer>
  );
};
