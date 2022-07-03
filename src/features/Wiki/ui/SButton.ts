import styled from 'styled-components';

export const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  color: inherit;
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
`;
