import { IconButton } from '@mui/material';
import styled from 'styled-components';

export const SquareIconButton = styled(IconButton)<{ $active?: boolean }>`
  margin: 2px;
  border-radius: 4px;
  color: ${({ $active }) =>
    $active ? 'rgba(33, 150, 243, 1)' : 'rgba(0, 0, 0, 0.54)'};

  &:hover {
    background-color: rgba(0, 0, 0, 0.08); /* Optional: hover style */
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
