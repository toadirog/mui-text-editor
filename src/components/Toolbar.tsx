import styled from 'styled-components';
import { TextFormatSelect } from './TextFormatSelect';
import { CustomTextActions } from './CustomTextActions';
import ImageButton from './ImageButton';
import ListActions from './ListActions';
import Divider from '@mui/material/Divider';
import LinkButton from './LinkButton';

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
      <Divider orientation="vertical" variant="middle" flexItem />
      <ListActions />
      <Divider orientation="vertical" variant="middle" flexItem />
      <LinkButton />
      <ImageButton />
    </ToolbarContainer>
  );
};
